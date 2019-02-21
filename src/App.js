import React, { Component } from 'react'
import './square.css'
import Swatch from './modes/Swatch'
import MemoryBlock from './modes/MemoryBlock'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<div id="thesquare">
						<MemoryBlock />
					</div>
				</header>
			</div>
		)
	}
}

export default App
