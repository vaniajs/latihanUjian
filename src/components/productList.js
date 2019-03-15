import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { urlApi } from '../support/urlApi';
import '../support/css/product.css';

class ProductList extends React.Component {
    state = { listProduct: [] }

    componentDidMount() {
        this.getDataProduct()
    }

    getDataProduct = () => {
        axios.get(urlApi + '/products')
            .then((res) => this.setState({ listProduct: res.data }))
            .catch((err) => console.log(err))
    }

    renderProductJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
        // if(val.diskon===0){
        //     return (
        //         <div className="card col-md-3 mr-5 mt-3" style={{ width: '18rem'}}>
        //             <img className="card-img-top img" width="200px" src={val.img} alt="Card img cap" />
        //             <div className="card-body" style={{ textAlign: "center" }}>
        //                 <h4 className="card-text">{val.nama}</h4>
        //                 <p className="card-text">Rp. {val.harga}</p>
        //                 <input type='button' className='btn btn-primary' value="Add to Cart"/>
        //             </div>
        //         </div>
        // )
        // }
        return (
                    <div className="card col-md-3 mr-5 mt-3" style={{ width: '18rem'}}>
                        <Link to={'/detail/'+val.id}><img className="card-img-top img" width="200px" src={val.img} alt="Card img cap" /></Link>
                        { 
                            val.diskon > 0 ?
                            <div className='discount'>{val.diskon}%</div>
                            :null
                        }
                        <div className="card-body" style={{ textAlign: "center" }}>
                            <h4 className="card-text">{val.nama}</h4>
                            {
                                val.diskon > 0 ?
                                <p className="card-text" style={{textDecoration:"line-through", color:"red", display:"inline"}}>Rp. {val.harga}</p>
                                : null
                            }
                            <p className="d-inline ml-2" style={{fontWeight:"500"}}>Rp. {val.harga - (val.harga*(val.diskon/100))} </p><br/>
                            <input type='button' className='btn btn-primary mt-2' value="Add to Cart"/>
                        </div>
                    </div>
            )
        })
        return jsx
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                {this.renderProductJsx()}
                </div>
            </div>
        )
    }
}

export default ProductList;