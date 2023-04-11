// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/token/ERC721/IERC721.sol " as IERC721  ;
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTLoan is ERC721Holder {
    using SafeMath for uint256;
    address public owner;
    uint256 public loanAmount;
    uint256 public interestRate;
    uint256 public loanDuration;
    uint256 public loanStartDate;
    address public borrower;
    address public lender;
    uint256 public tokenId;
    ERC721Enumerable public instan;
    IERC721 public nft;

    enum State {
        Open,
        Active,
        Defaulted,
        Completed
    }
    State public state;

    constructor(
        uint256 _loanAmount,
        uint256 _loanDuration,
        address _nft,
        address _borrower,
        uint256 _tokenId
    ) {
        tokenId = _tokenId;
        owner = msg.sender;
        borrower = _borrower;
        approveTokenTransfer(address(this), tokenId); // Approve function (Pop number 1 )
        loanAmount = _loanAmount;
        loanDuration = _loanDuration;
        nft = IERC721(_nft);
        state = State.Open;
    }

    // We will call this function after the deploying the comtract and after approval function of ERC721 is called by the borrower.
    function listNFT() public {
        require(state == State.Open, "Loan is not open");
        // instan.safeTransferFrom(borrower, address(this), instan.tokenOfOwnerByIndex(borrower, tokenId));
        nft.safeTransferFrom(borrower, address(this), tokenId);
        state = State.Active;
        //loanStartDate = block.timestamp;
    }

    // Display the NFT of the borrower to all the lenders (A,B,C)
    // Say suppose A's bid is accepted then call acceptOffer()

    function makeOffer() public payable {
        require(state == State.Active, "Loan is not active");
        require(msg.value == loanAmount, "Incorrect loan amount");
        lender = msg.sender; // Bid by three - four people
    }

    //Lender calls the function and msg.value == loanAmount
    function acceptOffer(uint256 _interestRate) public payable {
        require(state == State.Active, "Loan is not active");
        require(msg.sender == borrower, "Only borrower can accept the offer");
        loanStartDate = block.timestamp; // Loan start date
        interestRate = _interestRate; // InterestRate set
        loanStartDate = block.timestamp;
        require(
            block.timestamp < loanStartDate + loanDuration,
            "Loan has expired"
        );
        (bool sent, ) = borrower.call{value: msg.value}(""); //Transfer from contract -> borrower
        require(sent, "Failed to send Ether");
        //nft.safeTransferFrom(address(this), lender, nft.tokenOfOwnerByIndex(address(this), 0));
        state = State.Completed;
    }

    function payLoan() public payable {
        require(state == State.Active, "Loan is not active");
        require(msg.sender == borrower, "Only borrower can pay the loan");
        //LoanAmount + Calculated Interest pop up meta-mask
        require(
            msg.value == loanAmount + calculateInterest(),
            "Incorrect amount paid"
        );
        //borrower - contract - lender
        (bool sent, ) = lender.call{value: msg.value}(""); // Transfer from conract ->Lender
        require(sent, "Failed to send Ether");
        state = State.Completed;
    }

    function defaultLoan() public {
        require(state == State.Active, "Loan is not active");
        require(
            block.timestamp >= loanStartDate + loanDuration,
            "Loan has not yet expired"
        );
        //nft.transferFrom(address(this), lender, nft.tokenOfOwnerByIndex(address(this), 0));  //Transfer function should be used
        nft.safeTransferFrom(address(this), lender, tokenId);
        state = State.Defaulted;
    }

    function calculateInterest() public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - loanStartDate;
        uint256 interest = (loanAmount * interestRate * timeElapsed) / 365 days;
        return interest;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(address(this).balance > 0, "Balance is 0");
        payable(owner).transfer(address(this).balance);
    }

    function approveTokenTransfer(address _approved, uint256 _tokenId) public {
        nft.approve(_approved, _tokenId);
    }
}
