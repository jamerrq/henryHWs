import React from 'react';
import { connect } from 'react-redux';

import { addProduct } from '../../redux/actions/actions';

import Caja from '../../assets/caja.png';
import './form.css';


class Form extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            name: "",
            price: "",
            id: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addProduct({
            ...this.state,
            name: this.state.name,
            id: Date.now(),
        });
    }

    handleInputChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    render() {
        return (
            <form className='formBg' onSubmit={this.handleSubmit}>
                <div className='inputBox'>
                    <label>Nombre: </label>
                    <input
                        name='name'
                        onChange={this.handleInputChange}
                        value={this.state.name}
                    />
                </div>
                <div className='inputBox'>
                    <label>Precio:</label>
                    <input
                        type='number'
                        name='price'
                        onChange={this.handleInputChange}
                        value={this.state.price}
                    />
                </div>
                <button className='formBtn'>¡ADD!</button>
                <img src={Caja} alt='' className='logo' />
            </form>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        addProduct: (product) => {
            dispatch(addProduct(product));
        }
    }
}

export default connect(null, mapDispatchToProps)(Form);
