import React, { Component } from 'react'
import './square.css'
import Swatch from './modes/Swatch'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<div id="thesquare">
						<Swatch />
					</div>
				</header>
			</div>
		)
	}
}

export default App
