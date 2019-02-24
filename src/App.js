import React, { Component } from 'react'
import './square.css'
import Manager from './Manager'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<div id="thesquare">
						<Manager />
					</div>
				</header>
			</div>
		)
	}
}

export default App
