import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createReactClass from 'create-react-class';
import { ApolloProvider } from "react-apollo";

import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";


const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});


class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>

    );
  }
}

export default App; 
