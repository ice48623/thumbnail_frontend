import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Videos from './pages/Videos'
import GIF from './pages/GIF'
import Buckets from './pages/Buckets'

class App extends Component {


    render() {
        return (

            <div>
                <Router>
                    <div>
                        <Route exact path="/:bucket/show_all_videos" component={Videos}/>
                        <Route exact path="/:bucket/show_all_gifs" component={GIF}/>
                        <Route exact path="/" component={Buckets}/>
                    </div>
                </Router>
            </div>


        );
    }
}

export default App;
