import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Lending from "./components/Lending";
import Profile from "./components/Profile";
import Asset from "./components/Asset";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { useAccount, useConnect, useEnsName } from "wagmi";
import Borrow from "./components/Borrow";

function App() {
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet],
    [publicProvider()]
  );
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  return (
    <>
      <WagmiConfig client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lending" element={<Lending />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/asset/:id" element={<Asset />} />
        </Routes>
      </WagmiConfig>
    </>
  );
}

export default App;
