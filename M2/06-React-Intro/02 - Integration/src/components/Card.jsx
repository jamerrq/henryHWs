import React from "react";

class Card extends React.Component{

   constructor(props){
      super(props);
   }

   render(){
      return (
         <div>
            <button onClick={this.props.onClose}>X</button>
            <h2>Name: {this.props.name}</h2>
            <h2>Status: {this.props.status}</h2>
            <h2>Species: {this.props.species}</h2>
            <h2>Gender: {this.props.gender}</h2>
            <h2>Origin: {this.props.origin}</h2>
            <img src={this.props.image} alt={this.props.name} />
         </div>
      );
   }
}

export default Card;
