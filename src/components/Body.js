import React, { Component } from "react";
import data from "../initial_setup.json";


export default class Body extends Component {
    constructor(props) {
        super();

        this.state = {
            selectedTable: 20,

        };
    }
    handleSelectTable = id => {
        this.setState({
            selectedTable: id
        });
    };
    handleCheckinorCheckout = id => {
        if (this.props.tables[id].occupied === false) {
            this.props.handleOccupied(id);
            this.setState({
                active: true
            });
        } else {
            let totalcost = this.props.tables[id].totalPrice.reduce((a,b) => a+b) * 1.06;
            this.props.handleVacant(id);
            this.props.handleClearOrder(id);
            this.props.handleTotalCollected(totalcost)
            this.setState({
                active: false
                
            });
        }
    };
    handleRemoveItem = (id, item) => {
        this.props.handleRemoveItemFromOrder(id, item);
    };

    render() {
        return (
            <div className="container-fluid">

            {/* LEFT COLUMN */}
                <div className="row">
                    <div
                        style={{ minHeight: "780px", margin: "0 15px" }}
                        className="col-3 bg-success pt-3"
                    >
                        <div className="text-center">
                            <h4>
                                Table #
                                {this.state.selectedTable === 20
                                    ? "0"
                                    : `${this.state.selectedTable + 1}`}
                            </h4>
                            <button
                                className="btn btn-lg  btn-warning mt-5 mb-5 pt-2 pb-2 px-2 shadow"
                                style={{fontSize: '1.4rem'}}
                                onClick={() =>
                                    this.handleCheckinorCheckout(
                                        this.state.selectedTable
                                    )
                                }
                            >
                                {this.props.tables[this.state.selectedTable]
                                    .occupied === true
                                    ? "Check-Out"
                                    : "Check-In"}
                            </button>
                        </div>
                        <table className="table table-light">
                            <tbody>
                                <tr>
                                    <td>Food Amount:</td>
                                    <td>
                                        $
                                        {this.props.tables[
                                            this.state.selectedTable
                                        ].totalPrice.reduce((a, b) => a + b)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tax:</td>
                                    <td>
                                        $
                                        {(
                                            this.props.tables[
                                                this.state.selectedTable
                                            ].totalPrice.reduce(
                                                (a, b) => a + b
                                            ) * 0.06
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td>
                                        $
                                        {(
                                            this.props.tables[
                                                this.state.selectedTable
                                            ].totalPrice.reduce(
                                                (a, b) => a + b
                                            ) * 1.06
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Check list on left column */}
                        <table className="table table-light">
                            <tbody>
                                {this.props.tables[
                                    this.state.selectedTable
                                ].order.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span
                                                    className="btn btn-danger mr-5"
                                                    onClick={() =>
                                                        this.handleRemoveItem(
                                                            this.state
                                                                .selectedTable,
                                                            item
                                                        )
                                                    }
                                                >
                                                    X
                                                </span>
                                                {item}
                                            </td>
                                            <td>
                                                ${this.props.tables[this.state.selectedTable].totalPrice[index + 1].toFixed(2)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* CENTER TABLE COLUMN */}
                    <div
                        style={{ minHeight: "780px", margin: "0 15px" }}
                        className="col-5 bg-secondary"
                    >
                        <div className=" text-center">
                            {this.props.tables.map(table => {
                                if (table.id !== 20) {
                                    return (
                                        <button
                                            key={table.id}
                                            onClick={() =>
                                                this.handleSelectTable(table.id)
                                            }
                                            className={
                                                table.occupied === false
                                                    ? "btn btn-primary mt-3 mx-3 font-weight-bold"
                                                    : "btn btn-danger mt-3 mx-3 font-weight-bolder"
                                            }
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            {table.id + 1}
                                        </button>
                                    );
                                }else{
                                    return '';
                                }
                            })}
                        </div>
                    </div>
                    <div
                        style={{ minHeight: "780px", margin: "0 15px" }}
                        className="col bg-info"
                    >
                        <div className="text-center pt-2 px-1">
                            <h5>Food</h5>
                            {this.props.tables[this.state.selectedTable]
                                .occupied
                                ? data["food"].map((each, index) => {
                                      return (
                                          <button
                                              className="btn btn-warning mt-4 mx-1"
                                              key={index}
                                              style={{
                                                  width: "90px",
                                                  height: "70px"
                                              }}
                                              onClick={() =>
                                                  this.props.handleAddToOrder(
                                                      this.state.selectedTable,
                                                      `${each.food}`,
                                                      `${each.cost}`
                                                  )
                                              }
                                          >
                                              {each.food}
                                              <br />${each.cost.toFixed(2)}
                                          </button>
                                      );
                                  })
                                : data["food"].map((each, index) => {
                                      return (
                                          <button
                                              className="btn btn-secondary mt-4 mx-1"
                                              key={index}
                                              style={{
                                                  width: "95px",
                                                  height: "70px"
                                              }}
                                              disabled
                                          >
                                              {each.food}
                                              <br />${each.cost.toFixed(2)}
                                          </button>
                                      );
                                  })}
                            <hr color="blue" />
                            <h5>Drinks</h5>
                            {this.props.tables[this.state.selectedTable]
                                .occupied
                                ? data["drinks"].map((each, index) => {
                                      return (
                                          <button
                                              className="btn btn-warning mt-4 mx-2"
                                              key={index}
                                              style={{
                                                  width: "95px",
                                                  height: "70px"
                                              }}
                                              onClick={() =>
                                                  this.props.handleAddToOrder(
                                                      this.state.selectedTable,
                                                      `${each.food}`,
                                                      each.cost
                                                  )
                                              }
                                          >
                                              {each.food}
                                              <br />${each.cost.toFixed(2)}
                                          </button>
                                      );
                                  })
                                : data["drinks"].map((each, index) => {
                                      return (
                                          <button
                                              className="btn btn-secondary mt-4 mx-2"
                                              key={index}
                                              style={{
                                                  width: "90px",
                                                  height: "70px"
                                              }}
                                              disabled
                                          >
                                              {each.food}
                                              <br />${each.cost.toFixed(2)}
                                          </button>
                                      );
                                  })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
