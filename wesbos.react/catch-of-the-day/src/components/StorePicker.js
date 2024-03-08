import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // to be used with a ref in the input element below
  myInput = React.createRef();

  // do it this way to make `this` available otherwise you have to make
  // a constructor and do this: this.goToStore = this.goToStore.bind(this)
  // this is called a property
  goToStore = (event) => {
    event.preventDefault();
    // the first value is from React which gets the element
    // the second value is called on that
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
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