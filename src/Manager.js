import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Swatch from './modes/Swatch'
import MemoryBlock from './modes/MemoryBlock'
import Mole from './modes/Mole'
import Perimeter from './modes/Perimeter'
import Repetition from './modes/Repetition'
import Pathfinder from './modes/Pathfinder'
import Columnative from './modes/Columnative'
import Noise from './modes/Noise'


export default class Manager extends Component {
    render() {
        let loc = window.location
        console.log(loc.origin+loc.pathname)
        return (
            <Router>
                <>
                    <Switch>
                        <Route exact path="/" component={Menu} />
                        <Route path="/MemoryBlock" component={MemoryBlock} />
                        <Route path="/Mole" component={Mole} />
                        <Route path="/Perimeter" component={Perimeter} />    
                        <Route path="/Swatch" component={Swatch} />    
                        <Route path="/Repetition" component={Repetition} />
                        <Route path="/Pathfinder" component={Pathfinder} />
                        <Route path="/Columnative" component={Columnative} />                 
                        <Route path="/Noise" component={Noise} />                  
                        <Route component={FourOhFour} />
                    </Switch>
                </>
            </Router>
        )
    }
}

class Menu extends Component {
    render() {
        const loc = window.location.host
        return (
            <div className="square main-menu">
                <table>
                    <tbody>
                        <tr><td><Link to={`./Swatch`}>Swatch</Link></td><td><Link to="./MemoryBlock">Memory Block</Link></td><td><Link to="./Mole">Mole</Link></td></tr>
                        <tr><td><Link to="./Perimeter">Perimeter</Link></td><td><Link to="./Repetition">Repetition</Link></td><td><Link to="./Pathfinder">Pathfinder</Link></td></tr>
                        <tr><td><Link to="./Noise">Noise</Link></td><td><Link to="./Columnative">Columnative</Link></td><td><Link to="./#"><small>Reserved</small></Link></td></tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class FourOhFour extends Component {
    render(){
        return <div>404: Oops</div>
    }
}
