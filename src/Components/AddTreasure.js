import React, { Component } from 'react';
import axios from 'axios'

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureURL: '',
    };
  }

  handleInput(val){
    this.setState({ treasureURL: val});
  }

  addTreasure() {
    const { treasureURL } = this.state;
    axios.post('/api/treasure/user', { treasureURL })
         .then(res => {
             this.props.addMyTreasure(res.data)
             this.setState({ treasureURL: ''})
         })

    }

  render() {
    return (
      <div className="addTreasure">
        <input type="text" placeholder="Add image URL" onChange={(e)=>this.handleInput(e.target.value)} value={this.state.treasureURL} />
        <button onClick={()=>this.addTreasure()}>Add</button>
      </div>
    );
  }
}
