import React from 'react';
import styledAnimals from './Animals.module.css'

export default class Animals extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return <div className={styledAnimals.container}>
            {this.props.animals.map((a, i) => {
                return (
                    <div key={i} className={styledAnimals.containerAnimals}>
                        <h5>{"Nombre: " + a.name}</h5>
                        <img
                            src={a.image}
                            alt={a.name}
                            width="300px"
                        />
                        <span>{a.specie}</span>
                    </div>
                )
            })}
        </div>
    }
}
