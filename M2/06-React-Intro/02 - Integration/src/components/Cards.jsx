import Card from './Card';
import React from 'react';

class Cards extends React.Component{
   constructor(props){
      super(props);
   }

   render(){
      return (
         <div>
            {this.props.characters.map(element =>
               <Card
               id={element.id}
               key={element.id}
               name={element.name}
               status={element.status}
               species={element.species}
               gender={element.gender}
               origin={element.origin.name}
               image={element.image}
               onClose={() => window.alert('Emulamos que se cierra la card')}/>
            )}
         </div>
      )
   }
}

export default Cards;
