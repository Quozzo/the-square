import React, { Component } from 'react'
import './square.css'
import Swatch from './modes/Swatch'
import MemoryBlock from './modes/MemoryBlock'
import Mole from './modes/Mole'
import Perimeter from './modes/Perimeter'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<div id="thesquare">
						<Perimeter />
					</div>
				</header>
			</div>
		)
	}
}

export default App
