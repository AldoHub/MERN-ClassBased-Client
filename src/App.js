import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';

//import the routes
import Routes from "./routes";

class App extends Component {
 constructor(props) {
        super(props);
        this.state = {
            location: '/'
        }

    }
  componentDidMount = () => {
  
    //chech the window object in order to tell the path
    window.addEventListener("load",() => {
      
     if(window.location.pathname === "/additem"){
       //so we can hide the additem option on the menu
      this.setState({ location: window.location.pathname });
     }
 
    })

    //listen to the changes in the router
    this.unlistenHistory = this.props.history.listen((location) => {
      this.setState({ location: location.pathname });
     
    });
  }

  
  render() {
    const showAddItem = this.state.location;
    let addItem;
    if(showAddItem !== "/additem"){
      addItem =  <li id="additem"><Link to="/additem">Add Item</Link></li>
    }

    return (
      <div className="App">
      <nav>
        <ul>
          <li><Link to="/"> MERN </Link></li>
        </ul>
        <ul>
          <li><Link to="/">Items</Link></li>
         {addItem}
        </ul>
      </nav>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
