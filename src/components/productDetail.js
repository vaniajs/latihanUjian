import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { urlApi } from '../support/urlApi';

class ProductDetail extends React.Component {
    state={product:{},proteksi:''}

    componentDidMount(){
        this.getDataApi()
        this.proteksiJmlh()

    }

    getDataApi=()=>{
        var idUrl = this.props.match.params.id
        Axios.get(urlApi+'/products/' + idUrl)
        .then((res)=>{
            this.setState({product:res.data})

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    proteksiJmlh=()=>{
        var jumlah = this.refs.jumlah.value
        if (jumlah<1){
            this.setState({proteksi:'Min pembelian 1pc'})
        }else{
            this.setState({proteksi:''})
        }
    }

    render() {
        var {nama,img,diskon,desc,harga,category} = this.state.product
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className="card" style={{ width: '100%' }}>
                            <img className="card-img-top" src={img} alt="Card cap" />
                            {/* <div className="card-body">
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div> */}
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <hr></hr>

                        <div style={{backgroundColor:'#D50000',width:'50px',height:'22px', textAlign:'center', color:'white', display:'inline-block'}}>{diskon}%</div>
                        <span style={{fontWeight:'600', fontSize:'16px', color:'#606060', marginLeft:'10px', textDecoration:'line-through'}} >Rp {harga}</span>
                        <div style={{fontSize:'24px', fontWeight:'700',color:'#FF5722', marginTop:'20px'}}>Rp {harga - (harga*diskon/100)}</div>
                        
                        <div className='row'>
                            <div className='col-md-2'>
                            <div style={{marginTop:'20px',fontWeight:'700', color:'#606060',fontSize:'14px'}}>Jumlah</div>
                            <input ref='jumlah' type="number" min={1} className='form-control' style={{width:'60px', marginTop:'15px'}} onChange={this.proteksiJmlh} defaultValue='1'/>
                            <p style={{color:'red'}}>{this.state.proteksi}</p>
                            </div>
                            <div className='col-md-6'>
                            <div style={{marginTop:'20px',fontWeight:'700', color:'#606060',fontSize:'14px'}}>Catatan Untuk Penjual (Optional) </div>
                            <input type="text" min='1' className='form-control' style={{width:'100%', marginTop:'15px'}} placeholder='Contoh: Warna putih, ukural XL, edisi kedua'/>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-md-8 mt-3">
                            <p style={{color:'#606060',fontStyle:'italic'}}>Deskripsi<br/>
                            {desc}</p>
                            </div>
                        </div>
                        {
                            this.props.username !== '' ?
                            <div className='row mt-4'>
                            <div className='col-md-2'>
                            <input style={{width:'100%',fontSize:'12px',fontWeight:'500'}} className='btn border-secondary' value='Add to Wishlist'/>
                            </div>
                            <div className='col-md-3'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} className='btn btn-primary' value='Beli Sekarang'/>
                            </div>
                            <div className='col-md-3 mb-2'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} className='btn btn-success' value='Masukkan ke Keranjang'/>
                            </div>
                            {/* <input className='btn btn-primary col-md-3' value='Beli Sekarang'/>
                            <input className='btn btn-success col-md-2' value='Masukkan ke Keranjang'/> */}
                            </div>
                        :   <div>
                            <div className='row mt-4'>
                            <div className='col-md-2'>
                            <input style={{width:'100%',fontSize:'12px',fontWeight:'500'}} disabled className='btn border-secondary' value='Add to Wishlist'/>
                            </div>
                            <div className='col-md-3'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} disabled className='btn btn-primary' value='Beli Sekarang'/>
                            </div>
                            <div className='col-md-3 mb-2'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} disabled className='btn btn-success' value='Masukkan ke Keranjang'/>
                            </div>
                            </div>
                            <h8>Don't have any account yet? <Link to = '/register'>Register</Link></h8>
                            </div>
                        }  
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username: state.user.username
    }
}
export default connect(mapStateToProps)(ProductDetail);