import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Lending from "./components/Lending";
import Profile from "./components/Profile";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

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
          <Route path="/profilie" element={<Profile />} />
        </Routes>
      </WagmiConfig>
    </>
  );
}

export default App;
