
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Test from "./containers/Test.js" ;
import Header from "./components/Header.js" ;
import Footer from "./components/Footer.js" ;
class App extends Component {

    render() {
        return (
        <div>
          <Header/>
            <Switch>
                <Route path="/" exact component={Test}/> 
            </Switch>
          <Footer/>  
        </div> 
        );
    }
}

export default App;