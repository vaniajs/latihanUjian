import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/productList';
import ManageProduct from './components/manageProduct';
import PageNotFound from './components/pageNotFound';
import ProductDetail from './components/productDetail';
import ScrollToTop from './components/scrollToTop';
import { Route , withRouter , Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Cookie from 'universal-cookie';
import { keepLogin } from './1.actions';
import './App.css';


// kita mau pake connect, tapi di component kita ada route, jadi kita butuh withRouter

const objCookie = new Cookie()
class App extends Component {

  componentDidMount(){
    var ck = objCookie.get('userData')
    if(ck!==undefined){
      this.props.keepLogin(ck)
    }
  }



  render() {
    return (
      <div>
          <Navbar/>
        <ScrollToTop>
        <Switch> 
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/product' component={ProductList} exact/>
          <Route path='/manage-product' component={ManageProduct} exact/>
          <Route path='/detail/:id' component={ProductDetail} exact/>
          <Route path='*' component={PageNotFound} />
        </Switch>
        </ScrollToTop>

      </div>
    );
  }
}

export default withRouter(connect(null,{keepLogin})(App));
