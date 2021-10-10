import React, { Component } from 'react';
import { connect } from "react-redux";
import { Select } from 'semantic-ui-react';
import { map } from 'ramda';
import setIntervalBTC from '../../actions/setIntervalBTC';

class TimeoutSelect extends Component {

    handleSetInterval = (value) => {
        const { interval } = this.props;

        map((item, i) => {
            item.text === value.target.innerText && this.props.setIntervalBTC(item)
        },interval.options);        
    }

    render() {
        const { interval } = this.props;
        return (
            <Select placeholder='Select interval' value={interval.active.value} onChange={item => this.handleSetInterval(item)} options={interval.options} />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIntervalBTC: payload => dispatch(setIntervalBTC(payload))
    };
  };

const mapStateToProps = (rootReducer) => {
    return {
        interval: rootReducer.interval
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(TimeoutSelect);