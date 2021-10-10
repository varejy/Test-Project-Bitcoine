import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

import setSortSetting from "../../actions/setSortSetting";
import setPagination from "../../actions/setPagination";

import Pagination from "../Pagination/Pagination";

const MAX_BTC_IN_PAGE = 5;

class HistoryTable extends Component {
  constructor (props) {
    super(props);

    const {sort: { data }} = this.props;

    this.state = {
      visiblePrices: data.slice(0, MAX_BTC_IN_PAGE)
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (this.props.sort !== nextProps.sort) {
        this.setState({
            visiblePrices: nextProps.sort.data.slice(0, MAX_BTC_IN_PAGE),
        });
    }
}

  setSort = (column) => () => {
    this.props.setSortSetting(column)
  };

  handleChangePagination = (value) => {
    const {sort: { data }} = this.props;
    this.props.setPagination(value)

    this.setState({
      visiblePrices: data.slice(value * MAX_BTC_IN_PAGE, (value + 1) * MAX_BTC_IN_PAGE)
  });
  }

  render() {
    const {
      sort: { column, direction },
      sort,
      pagination
    } = this.props;
    const { visiblePrices } = this.state;
    const pages = (sort.data.length-1) / MAX_BTC_IN_PAGE;

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Date
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "time" ? direction : null}
              onClick={this.setSort("time")}
            >
              Time
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "price" ? direction : null}
              onClick={this.setSort("price")}
            >
              Price
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {visiblePrices.map(({ date, time, price }) => (
            <Table.Row key={price}>
              <Table.Cell>{date}</Table.Cell>
              <Table.Cell>{time}</Table.Cell>
              <Table.Cell>{`${price}`.substr(0, 9)} USD</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Pagination points={pages} activePoint={pagination} onChange={this.handleChangePagination}/>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSortSetting: (payload) => dispatch(setSortSetting(payload)),
    setPagination: (payload) => dispatch(setPagination(payload))
  };
};

const mapStateToProps = (rootReducer) => {
  return {
    btc: rootReducer.price,
    sort: rootReducer.sort,
    pagination: rootReducer.pagination
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTable);
