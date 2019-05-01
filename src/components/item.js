import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Item extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    price: "",
    redirect: false
  }

  componentDidMount = () => {
    fetch("http://localhost:8000/item/" + this.props.match.params.id).then(res => {
      return res.json();
    }).then(blob => {
     
      this.setState({name: blob.item.name});
      this.setState({description: blob.item.description});
      this.setState({image: blob.item.image});
      this.setState({price: blob.item.amount});
      
    });
  }

  getInputValues = (e) => {
    
    this.setState({[e.target.name]: e.target.value})
    //console.log(this.state[e.target.name])
  }
  updateItem = (e) => {
    e.preventDefault();
    //update the item
    const item = {
      name : this.state.name,
      description :  this.state.description,
      image: this.state.image,
      amount: this.state.price
    }
    const options = { 
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
         body: JSON.stringify(item)
    
    } 
   
    fetch("http://localhost:8000/item/"+ this.props.match.params.id, options)
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

deleteItem = () => {
  let confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if(confirmDelete){
    const options = { 
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.props.match.params.id})
    
    } 
    
    fetch("http://localhost:8000/item/"+ this.props.match.params.id, options)
    .then(res => {
      console.log(res);
      this.setState({redirect: true});
    })
  }else{
    console.log("Item was not deleted")
  }

}

  render() {
    
    const redirect = this.state.redirect;
    if(redirect){
        return <Redirect to="/" />  
    }
    return (
      <React.Fragment>
          <section >
          <div className="banner"></div>
          <h2>Update an item</h2>

      <div className="itemCreation">
          <form onSubmit={this.updateItem}>
           <div className="control">
            <label htmlFor="name">Product Name: </label>
            <input type="text" name="name" onChange={this.getInputValues} defaultValue={this.state.name} />
            </div>

            <div className="control">
            <label htmlFor="description">Product Description: </label>
            <textarea name="description" onChange={this.getInputValues} value={this.state.description} >
            </textarea>
            </div>

            <div className="control">
            <label htmlFor="price">Product Price: </label>
            <input type="number" name="price" onChange={this.getInputValues} defaultValue={this.state.price} />
            </div>
            
            <div className="control">
            <label htmlFor="image">Product Image: </label>
            <input type="text" name="image" onChange={this.getInputValues} defaultValue={this.state.image} />
            </div>
            
            <input type="submit" value="Update post" />
         </form>

          <div className="preview">
          
           <img src={this.state.image} alt="product" />
            <p>Product Name: <strong> {this.state.name}</strong></p>
            <p>Product Description: <strong> {this.state.description}</strong> </p>
            <p>Product Price: <strong> {this.state.price} </strong></p>
            <button className="delete" onClick={this.deleteItem}>Delete this Item</button>
          </div>
         
        </div>

         </section>

      </React.Fragment>
    );
  }
}

export default Item;
