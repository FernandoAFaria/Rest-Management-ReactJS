import React, { Component } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

import "./App.css";
//SETS THE INITIAL STATE
let initialState = {
    completedTables: [],
    currentTables: [],
    totalCollected: 0
};
for (let i = 0; i <= 19; i++) {
    initialState.currentTables.push({
        id: i,
        occupied: false,
        order: [],
        totalPrice: [0]
    });
}

initialState.currentTables.push({
    id: 20,
    occupied: null,
    order: [],
    totalPrice: [0]
});

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    //FIX THE FLOATING POINT ISSUE//
    handleTotalCollected = total => {
      let fixedTotal = total.toFixed(2);
      let stateCopy = this.state;
      let newTotal = parseFloat(fixedTotal) + parseFloat(this.state.totalCollected);
      stateCopy.totalCollected = newTotal.toFixed(2);
      this.setState({...stateCopy});
      
    }
    handleOccupied = id => {
        let copyCurrentTables = this.state.currentTables;
        copyCurrentTables[id].occupied = true;
        this.setState({
            currentTables: [...copyCurrentTables]
        });
    };
    handleVacant = id => {
        let copyCurrentTables = this.state.currentTables;
        copyCurrentTables[id].occupied = false;
        this.setState({
            currentTables: [...copyCurrentTables]
        });
    };

    handleRemoveItemFromOrder = (id, item, cost) => {
        let copyCurrentTables = this.state.currentTables;
        let indexOfLastItem = copyCurrentTables[id].order.lastIndexOf(item);

        let removedItem = copyCurrentTables[id].order.filter(
            (orderitem, index) => index !== indexOfLastItem
        );

        let removedCost = copyCurrentTables[id].totalPrice.filter(
            (item, index) => index !== indexOfLastItem + 1
        );
        copyCurrentTables[id].order = removedItem;
        copyCurrentTables[id].totalPrice = removedCost;

        this.setState({
            currentTables: [...copyCurrentTables]
        });
    };
    handleClearOrder = id => {
        let copyCurrentTables = this.state.currentTables;

        copyCurrentTables[id].order = [];
        copyCurrentTables[id].totalPrice = [0];

        this.setState({
            currentTables: [...copyCurrentTables]
        });
    };

    handleAddToOrder = (id, food, cost) => {
        let copyCurrentTables = this.state.currentTables;
        copyCurrentTables[id].order.push(food);

        let total =
            parseFloat(cost) + parseFloat(copyCurrentTables[id].totalPrice);

        copyCurrentTables[id].totalPrice.push(total);

        this.setState({
            currentTables: [...copyCurrentTables]
        });
    };

    render() {
        return (
            <div className="App" style={{minHeight: '720px'}}>
               
                <Header totalCollected={this.state.totalCollected} />
                <Body
                    tables={this.state.currentTables}
                    handleOccupied={this.handleOccupied}
                    handleVacant={this.handleVacant}
                    handleRemoveItemFromOrder={this.handleRemoveItemFromOrder}
                    handleClearOrder={this.handleClearOrder}
                    handleAddToOrder={this.handleAddToOrder}
                    totalCollected={this.state.totalCollected}
                    handleTotalCollected={this.handleTotalCollected}
                />
            </div>
        );
    }
}

export default App;
