
import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import HistoryTable from './components/HistoryTable/HistoryTable';
import TimeoutSelect from './components/TimeoutSelect/TimeoutSelect';

import getPrice from "./services/getPrice";
import getPriceHistory from "./services/getPriceHistory";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      interval: this.props.interval
    }
  }

  getBitcoin () {
    setInterval(() => this.props.getPrice(), this.state.interval.active.value)
  }

  componentDidMount() {
    this.props.getPriceHistory()
    this.getBitcoin();
  }
  render() {    
    return (
      <div className="App">
        <div className="wrapp">
          <TimeoutSelect/>
          <HistoryTable />
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getPrice: (payload) => dispatch(getPrice(payload)),
    getPriceHistory: (payload) => dispatch(getPriceHistory(payload)),
  };
};

const mapStateToProps = (rootReducer) => {
  return {
    interval: rootReducer.interval
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
