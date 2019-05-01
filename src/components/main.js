import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Main extends Component {
  
  state = {
    items: []
  }


  componentDidMount = () =>{
    console.log("mounted");
    fetch("http://localhost:8000/items").then(res => {
      return res.json();
    }).then(blob => {
      this.setState({items: blob.data});
     // console.log(this.state.items)
    })
  }




  render() {
    return (
      <React.Fragment>
        <header>
          <h1>MERN Items</h1>
        </header>
        <section>
          <h2>Items</h2>
          <div className="itemsContainer">
          {this.state.items.map(item => {
            return(
              <div className="item" key={item._id}>
                 <div className="cover" style={{backgroundImage: "url(" + item.image + ")" }}></div>
                  <div>
                   <Link to={"item/" + item._id}><h3>{item.name}</h3></Link> 
                  <p>{item.description}</p>
                  </div>
              </div>
            )
          })}
          </div>
        </section>
          
      </React.Fragment>
    );
  }
}

export default Main;
