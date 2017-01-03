import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order  from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';


class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    //get initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

componentWillMount() {
  this.ref = base.syncState(`${this.props.params.storeId}/fishes`
    , {
      context: this,
      state: 'fishes'
    });
}

componentWillUnmount() {
  base.removeBinding(this.ref);
}

  addFish(fish) {
    //upddate state
    const fishes = {...this.state.fishes};
    //add in new fish
     const timestamp = Date.now();
     fishes['fish-${timestamp}'] = fish;
    //add state
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
     });
  }

  addToOrder(key) {
    //take copy state
    const order = {...this.state.order};
    //update add new number fish ordered
    order[key] = order[key] + 1 || 1;
    //update out state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
          {
            Object
            .keys(this.state.fishes)
            .map(key => <Fish key={key} index={key}
            details={this.state.fishes[key]} addToOrder
            ={this.addToOrder}/>)
          }
          </ul>
      </div>
      <Order fishes={this.state.fishes} order={this.state.order}
      />
      <Inventory addFish={this.addFish}
      loadSamples={this.loadSamples}/>
      </div>
    )
  }
}
export default App;
