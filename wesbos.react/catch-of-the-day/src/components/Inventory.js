import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import Login from "./Login"
import base, { firebaseApp } from "../base";
import AddFishForm from "./AddFishForm"
import EditFishForm from "./EditFishForm"

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    // base is the firebase class, fetch is method that is calling firebase
    // we are getting db object that has the storeId
    // storeId ultimately comes from the Router which parsed it out of the url
    // fetch returns a promise -- so you must await it if you want the returned value
    const store = await base.fetch(this.props.storeId, { context: this });
    // this is silly and should not really be used ever, but this is what Wes did
    // this piece of code just takes whoever is logged in via github
    // if they are the first visitor to a store, they are made the owner of the store
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(store)
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return <div><p>Sorry you are not the owner.{logout}</p></div>
    }
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm key={key}
            fish={this.props.fishes[key]}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;