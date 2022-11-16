import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { me } from "./store";
import AllProduct from "./components/AllProducts";
import AdminDash from "./components/AdminDash";
import NewProductForm from "./components/NewProductForm";
import SingleProduct from "./components/SingleProduct";
import EditProduct from "./components/EditProduct";
import EditUser from "./components/EditUser";
import UserDash from "./components/UserDash";
import Checkout from "./components/Checkout";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/checkout" component={Checkout} />
          <Route exact path="/products/single/:id" component={SingleProduct} />
          <Route exact path="/products" component={AllProduct} />
          <Route path="/products/:category" component={AllProduct} />
          <Route path="/admin" component={AdminDash} />
          <Route path="/user" component={UserDash} />
          <Route path="/new-product" component={NewProductForm} />
          <Route path="/edit-product/:id" component={EditProduct} />
          <Route path="/edit-user/:id" component={EditUser} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
