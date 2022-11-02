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
  };

  mintTokens = async (): Promise<void> => {
    this.setState({
      ...this.state,
      loading: true,
    });

    const counter = await this.state.tezos.wallet.at(
      "KT1Quos8JNLs94SCTiyN6GdrqeT77yCATS6M"
    );
    const operation = await counter.methods
      .mint(this.state.accountPkh, 1000)
      .send();
    await operation.confirmation();

    this.setState({
      ...this.state,
      loading: false,
    });
  };

  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.accountPkh ? (
            <div className="App-connected">
              <div className="App-address">
                Connected with {this.state.accountPkh}
              </div>
              <button
                className="App-button"
                disabled={this.state.loading}
                onClick={() => this.mintTokens()}
              >
                {this.state.loading ? "Loading..." : "Mint some tokens"}
              </button>
            </div>
          ) : (
            <div className="App-not-connected">
              <button
                className="App-button"
                onClick={() => this.connectWallet()}
              >
                Connect Wallet
              </button>
            </div>
          )}
        </header>
      </div>
    );
  }
}
