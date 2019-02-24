import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Swatch from './modes/Swatch'
import MemoryBlock from './modes/MemoryBlock'
import Mole from './modes/Mole'
import Perimeter from './modes/Perimeter'


export default class Manager extends Component {
    render() {
        return (
            <Router>
                <>
                    <Route exact path="/" component={Menu} />
                    <Route path="/swatch" component={Swatch} />
                    <Route path="/MemoryBlock" component={MemoryBlock} />
                    <Route path="/Mole" component={Mole} />
                    <Route path="/Perimeter" component={Perimeter} />
                </>
            </Router>
        )
    }
}

class Menu extends Component {
    render() {
        return (
            <div className="square">
                <table>
                    <tbody>
                        <tr><td><Link to="/swatch">Swatch</Link></td><td><Link to="/MemoryBlock">Memory Block</Link></td></tr>
                        <tr><td><Link to="/Mole">Mole</Link></td><td><Link to="/Perimeter">Perimeter</Link></td></tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
