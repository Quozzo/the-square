import React, { Component } from 'react'
import './square.css'
import Manager from './Manager'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<div id="thesquare">
					<Manager />
				</div>
			</div>
		)
	}
}

export default App
