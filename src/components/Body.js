import React, { Component } from "react";
import data from "../initial_setup.json";
let tax = data.taxRate;
const restaurantName = data.restaurantName;



export default class Body extends Component {
    constructor(props) {
        super();

        this.state = {
            selectedTable: 0,
            printed: false
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
            // this.setState({
            //     active: true
            // });
        } else {
            let totalcost =
                this.props.tables[id].totalPrice.reduce((a, b) => a + b) * 1.06;
            this.props.handleVacant(id);
            this.props.handleClearOrder(id);
            this.props.handleTotalCollected(totalcost);
            // this.setState({
            //     active: false
            // });
        }
    };
    handleRemoveItem = (id, item) => {
        this.props.handleRemoveItemFromOrder(id, item);
    };

    handlePrint = () => {
        this.setState({
            printed: true
        });
        let wnd = window.open("about:blank", "", "_blank");
        let printData = this.props.tables[this.state.selectedTable].order.map(
            (item, index) => {
                return `<tr className='row'><td>${item} -</td><td> $${this.props.tables[
                    this.state.selectedTable
                ].totalPrice[index + 1].toFixed(2)}</td><tr>`;
            }
        );
        let newData = printData.join().toString();

        let subtotal = this.props.tables[
            this.state.selectedTable
        ].totalPrice.reduce((a, b) => a + b);
        let taxAmount = subtotal * tax;
        let totalAmount = subtotal + taxAmount;
        let printField = `
            <div className='container'>
            <h3>${restaurantName}</h3>
            <h4 style="margin-bottom: -5px">Table # ${this.state.selectedTable +
                1}</h4>
            <div style="width: 120px; height: 10px; position: aboslute; background: black; transform: translateY(19px)"></div>
            <table className="table" style="margin-top: 20px;">
            ${newData}
            <tr><td><hr></td><td><hr></td></tr>
            <tr>
            <td><strong>Subtotal:</td><td> $${subtotal.toFixed(2)}</strong></td>
            </tr>
            <tr>
            <td><strong>Tax:</td><td> $${taxAmount.toFixed(2)}</strong></td>
            </tr>
            <tr>
            <td><strong>Total: </td><td>$${totalAmount.toFixed(2)}</strong></td>
            </tr>
            </table>
            </div>
            `;

        wnd.document.write(printField);
        wnd.print();
    };

    render() {
        return (
            <div
                className="container-fluid"
                style={{padding: "25px 10px", marginTop: "-45px" }}
            >
                {/* LEFT COLUMN */}
                <div className="row">
                    <div
                        style={{ minHeight: '600px', margin: "0 5px" }}
                        className="col-2 bg-info pt-3"
                    >
                        <div className="text-center">
                            <h5 className="mb-5">Table #{this.state.selectedTable + 1}</h5>
                            <button
                                className="btn btn-lg mb-2 btn-danger pt-2 pb-2 px-3 shadow"
                                style={{ fontSize: "1rem" }}
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

                            {this.props.tables[this.state.selectedTable]
                                .totalPrice.length > 1 ? (
                                <button
                                    className="btn mb-2 btn-lg btn-success pt-2 pb-2 px-4 ml-2 shadow"
                                    onClick={() => this.handlePrint()}
                                >
                                    Print
                                </button>
                            ) : (
                                <button
                                    className="btn mb-2 btn-lg btn-success pt-2 pb-2 px-4 ml-2 shadow"
                                    disabled
                                    onClick={() => this.handlePrint()}
                                >
                                    Print
                                </button>
                            )}
                        </div>
                        <table className="table table-light mt-5">
                            <tbody>
                                <tr>
                                    <td>Food Amount:</td>
                                    <td id="subtotal">
                                        $
                                        {this.props.tables[
                                            this.state.selectedTable
                                        ].totalPrice.reduce((a, b) => a + b)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tax:</td>
                                    <td id="taxAmount">
                                        $
                                        {(
                                            this.props.tables[
                                                this.state.selectedTable
                                            ].totalPrice.reduce(
                                                (a, b) => a + b
                                            ) * tax
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td id="total">
                                        $
                                        {(
                                            this.props.tables[
                                                this.state.selectedTable
                                            ].totalPrice.reduce(
                                                (a, b) => a + b
                                            ) *
                                            (1 + tax)
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
                                                    className="btn btn-danger mr-1"
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
                                                $
                                                {this.props.tables[
                                                    this.state.selectedTable
                                                ].totalPrice[index + 1].toFixed(
                                                    2
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* CENTER TABLE COLUMN */}
                    <div
                        style={{ margin: "0 5px" }}
                        className="col bg-secondary pb-3 px-0"
                    >
                        <div className=" text-center pt-3 px-1">
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
                                                    ? "btn btn-primary mt-3 mx-2 font-weight-bold"
                                                    : "btn btn-danger mt-3 mx-2 font-weight-bolder"
                                            }
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                fontSize: "1.2rem"
                                            }}
                                        >
                                            {table.id + 1}
                                        </button>
                                    );
                                } else {
                                    return "";
                                }
                            })}
                        </div>
                    </div>
                    
                    
                    {/* RIGHT COLUMN */}
                    <div
                        style={{ margin: "0 5px" }}
                        className="col bg-success"
                    >
                        <div className="text-center pt-3 pb-3 px-1">
                            <h5>
                                <strong>Food</strong>
                            </h5>
                            {this.props.tables[this.state.selectedTable]
                                .occupied
                                ? data["food"].map((each, index) => {
                                      return (
                                          <button
                                              className="btn btn-info mt-4 mx-1 px-3"
                                              key={index}
                                              style={{
                                                  minWidth: "85px",
                                                  height: "75px"
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
                                              className="btn btn-info mt-4 mx-1 px-3"
                                              key={index}
                                              style={{
                                                  minWidth: "85px",
                                                  height: "75px"
                                              }}
                                              disabled
                                          >
                                              {each.food}
                                              <br />${each.cost.toFixed(2)}
                                          </button>
                                      );
                                  })}
                            <hr color="red" className="mt-4 mb-4" />
                            <h5>
                                <strong>Drinks</strong>
                            </h5>
                            {this.props.tables[this.state.selectedTable]
                                .occupied
                                ? data["drinks"].map((each, index) => {
                                      return (
                                          <button
                                              className="btn btn-info mt-4 mx-2 px-3"
                                              key={index}
                                              style={{
                                                  minWidth: "85px",
                                                  height: "75px"
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
                                              className="btn btn-info mt-4 mx-2 px-3"
                                              key={index}
                                              style={{
                                                  minWidth: "85px",
                                                  height: "75px"
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
