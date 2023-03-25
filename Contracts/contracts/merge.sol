// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IERC4907.sol";
//import "./IERC721.sol";
import "./IERC20.sol";


contract merge is ERC721, IERC4907 {
    struct UserInfo 
    {
        address user;   // address of user role
        uint64 expires; // unix timestamp, user expires
    }
    // Struct to represent a loan
     struct Loan {
        uint256 id;
        address borrower;
        address lender;
        uint256 nftId;
        uint256 startTime;
        uint256 endTime;
        uint256 interestRate;
        bool repaid;
        bool exists;
    }
     
    mapping(uint256 => Loan) public loans; // Mapping of loan ID to loan details

    mapping (uint256  => UserInfo) internal _users; //Who is the current user of the NFT

    uint256 public loanIdCounter;  // Counter for loan IDs
    address public nftAddress;  // Address of the ERC721 contract
    address public tokenAddress;// Address of the ERC20 token contract

     constructor(address _nftAddress, address _tokenAddress , string memory name_, string memory symbol_) ERC721(name_, symbol_)  {
        nftAddress = _nftAddress;
        tokenAddress = _tokenAddress;
        loanIdCounter = 0;
    }

    //constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}


    // Function to create a new loan
    function createLoan(uint256 _nftId, uint256 _duration, uint256 _interestRate) public {
        // Check that the NFT is owned by the borrower
        require(IERC721(nftAddress).ownerOf(_nftId) == msg.sender, "NFT not owned by borrower");

        // Check that the borrower has approved the contract to spend the NFT
        require(IERC721(nftAddress).getApproved(_nftId) == address(this), "NFT not approved for spending");

        // Transfer the NFT to the contract
        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), _nftId);

        // Transfer the token from the borrower to the contract
        uint256 tokenAmount = _duration * _interestRate;
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), tokenAmount);

        // Create the loan
        loanIdCounter++;
        loans[loanIdCounter] = Loan(
            loanIdCounter,
            msg.sender,
            address(0),
            _nftId,
            block.timestamp,
            block.timestamp + _duration,
            _interestRate,
            false,
            true
        );
    }

    // Function to lend on an existing loan
    function lend(uint256 _loanId) public {
        // Check that the loan exists and hasn't been repaid
        require(loans[_loanId].exists, "Loan does not exist");
        require(!loans[_loanId].repaid, "Loan has already been repaid");

        // Check that the loan hasn't expired
        require(block.timestamp < loans[_loanId].endTime, "Loan has expired");

        // Check that the lender has enough tokens
        uint256 interest = calculateInterest(_loanId);
        require(IERC20(tokenAddress).balanceOf(msg.sender) >= interest, "Not enough tokens");

        // Transfer the tokens from the lender to the contract
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), interest);

        // Update the loan
        loans[_loanId].lender = msg.sender;
    }

    // Function to calculate the interest owed on a loan
    function calculateInterest(uint256 _loanId) public view returns (uint256) {
        uint256 elapsed = block.timestamp - loans[_loanId].startTime;
        uint256 interest = elapsed * loans[_loanId].interestRate;
        return interest;
    }

    // Function to repay a loan
    function repay(uint256 _loanId) public {
        //
    // Check that the loan exists and hasn't been repaid
    require(loans[_loanId].exists, "Loan does not exist");
    require(!loans[_loanId].repaid, "Loan has already been repaid");

    // Check that the borrower is repaying the loan
    require(msg.sender == loans[_loanId].borrower, "Only borrower can repay loan");

    // Calculate the interest owed on the loan
    uint256 interest = calculateInterest(_loanId);

    // Transfer the NFT back to the borrower
    IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, loans[_loanId].nftId);

    // Transfer the interest to the lender
    IERC20(tokenAddress).transfer(loans[_loanId].lender, interest);

    // Mark the loan as repaid
    loans[_loanId].repaid = true;
}
    
    
    /// @notice set the user and expires of an NFT
    /// @dev The zero address indicates there is no user
    /// Throws if `tokenId` is not valid NFT
    /// @param user  The new user of the NFT
    /// @param expires  UNIX timestamp, The new user could use the NFT before expires
    function setUser(uint256 tokenId, address user, uint64 expires) public override virtual{
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC4907: transfer caller is not owner nor approved");
        UserInfo storage info =  _users[tokenId];

        // require(info.expires < block.timestamp, "Already rented to someone");

        info.user = user;
        info.expires = expires;
        emit UpdateUser(tokenId, user, expires);
    }
    

    /// @notice Get the user address of an NFT
    /// @dev The zero address indicates that there is no user or the user is expired
    /// @param tokenId The NFT to get the user address for
    /// @return The user address for this NFT
    function userOf(uint256 tokenId) public view override virtual returns(address){
        if (uint256(_users[tokenId].expires) >=  block.timestamp) {
            return  _users[tokenId].user;
        } else {
            return ownerOf(tokenId);
        }
    }

    /// @notice Get the user expires of an NFT
    /// @dev The zero value indicates that there is no user
    /// @param tokenId The NFT to get the user expires for
    /// @return The user expires for this NFT
    function userExpires(uint256 tokenId) public view override virtual returns(uint256){
        if (uint256(_users[tokenId].expires) >=  block.timestamp) {
            return _users[tokenId].expires;
        } else {
            return 115792089237316195423570985008687907853269984665640564039457584007913129639935;
        }
    }

    /// @dev See {IERC165-supportsInterface}.
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC4907).interfaceId || super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId,uint256 batchSize) internal virtual override {
        
        //super._beforeTokenTransfer(from,to,tokenId);
        super._beforeTokenTransfer(from,to,tokenId,batchSize);
        if (from != to && _users[tokenId].user != address(0)) {
            delete _users[tokenId];
            emit UpdateUser(tokenId, address(0), 0);
        }
    }

    function mint(uint256 tokenId) public {
        // this is the mint function that you need to customize for yourself
        _mint(msg.sender, tokenId);
    }

    function time() public view returns (uint256) {
        return block.timestamp;
    }
} 