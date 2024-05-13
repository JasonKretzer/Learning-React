import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // to be used with a ref in the input element below
  myInput = React.createRef();

  // do the function declaration this way to make `this` available otherwise you have to make
  // a constructor and do this: this.goToStore = this.goToStore.bind(this)
  // this is called a property
  goToStore = (event) => {
    event.preventDefault();
    const storeName = this.myInput.current.value; // current gets the input element, value is a standard value call on that element
    this.props.history.push(`/store/${storeName}`);
    // this is called push state -- note that props.history is part of the Router
    // StorePicker is a child element (NOT a subclass) of Router
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;