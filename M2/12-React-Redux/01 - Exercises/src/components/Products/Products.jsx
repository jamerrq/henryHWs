import { connect } from 'react-redux';
import React from 'react';
import './products.css';
import Card from '../Card/Card'
import { GET_STORE_NAME } from '../../redux/actions/types';


export function Products({ list, storeName, getStoreName }) {

    React.useEffect(() => {
        getStoreName();
    }, [getStoreName]);

    return (
        <>
            <div className='productsBg'>
                <h1 className='productsTl'>{storeName}</h1>

                <div className='productsList'>
                    {
                        /* ¡Renderiza aquí todas tus cards! */
                        list.map((elem, index) => {
                            return (
                                <Card
                                    name={elem.name}
                                    price={elem.price}
                                    id={elem.id}
                                    key={index}
                                >
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export function mapStateToProps(state) {
    return {
        list: state.list,
        storeName: state.storeName,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getStoreName: () => {
            dispatch({
                type: GET_STORE_NAME,
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
