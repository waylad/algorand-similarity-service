import { TempleDAppNetwork, TempleWallet } from "@temple-wallet/dapp";
import algosdk from "algosdk";
import React from "react";

import logo from "./logo.svg";

import "./App.css";

type IProps = {};

type IState = {
  loading: boolean;
  wallet?: TempleWallet;
  tezos?: any;
  accountPkh?: string;
};

export class App extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      wallet: undefined,
      tezos: undefined,
      accountPkh: undefined,
    };
  }

  connectWallet = async (): Promise<void> => {
    const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
    const indexerServer = "https://testnet-algorand.api.purestake.io/idx2";
    const token = { "X-API-Key": "cnPOsJmkLV99ccOnzgC3d9DOrHyXrs5ka9JB2Vcl" };
    const port = "";

    const algodClient = new algosdk.Algodv2(token, algodServer, port);
    const indexerClient = new algosdk.Indexer(token, indexerServer, port);

    const health = await algodClient.healthCheck().do();
    console.log(health);

    const resp = await indexerClient.lookupAssetByID(911883637).do()
    console.log(resp)
    // const resp = await AlgoSigner.indexer({
    //   ledger: 'TestNet',
    //   path: `/v2/assets?name=${'ALGOSPACE Ship'}&limit=${4}&creator=${address}`,
    // })
    
  };

  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <button className="App-button" onClick={() => this.connectWallet()}>
            Connect Wallet
          </button>
        </header>
      </div>
    );
  }
}
