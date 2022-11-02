import algosdk from "algosdk";
import React from "react";

import logo from "./logo.svg";

import "./App.css";

function App() {
  const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
  const indexerServer = "https://testnet-algorand.api.purestake.io/idx2";
  const token = { "X-API-Key": "cnPOsJmkLV99ccOnzgC3d9DOrHyXrs5ka9JB2Vcl" };
  const port = "";

  const algodClient = new algosdk.Algodv2(token, algodServer, port);
  const indexerClient = new algosdk.Indexer(token, indexerServer, port);

  const health = algodClient.healthCheck().do();
  console.log(health);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
