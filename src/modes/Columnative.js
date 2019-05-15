import React, { Component } from 'react'
import { fail } from 'assert'

export default class Columnative extends Component {
	state = {
		phase: 'intro',
		cols: 5,
      colsHeight: Array(5).fill(100),
      limit: 20000
	}

	start = () => {
      const { limit } = this.state

		this.setState({
         colsHeight: Array(5).fill(100),
         phase: "start"
      })
      
      this.successful = setTimeout(()=>{
         clearInterval(this.timer)
         this.setState({
            phase: "success"
         })
      }, limit)

		this.timer = setInterval(() => {
			let { colsHeight } = this.state

			colsHeight = colsHeight.map((v, i) => {
            v -= 0.15
            				if (v <= 0) {
					this.setState({
						phase: "fail"
					})
               clearInterval(this.timer)
               clearTimeout(this.successful)
            }

            return v
			})

			this.setState({
				colsHeight
         })

      }, 15)
   }
   
   onClick = (e, id) => {
      e.preventDefault()
      const { colsHeight } = this.state
      let v = colsHeight[id] + 5
      v = v > 100 ? 100 : v
      colsHeight[id] = v
      this.setState({
         colsHeight
      })
   }

   intro = () => {
      this.setState({
         phase: "intro"
      })
   }

   onContextMenu = e => e.preventDefault()

	render() {
		const { cols, colsHeight, phase } = this.state
		if (phase === 'intro') {
			return (
				<div className='square border-b' onClick={this.start}>
					<h3>Columnative</h3>
					Columns will start to fall, click on the columns to increase their hieght and prevent them from hitting the bottom before the timer runs out. You have {this.state.limit/1000} seconds to stop {this.state.cols} columns from falling.
					<br />
					<br />
					Click to begin.
				</div>
			)
		} else if (phase === 'start') {
			return (
				<div className='square' id='columnative'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							height: '100%',
							width: '100%'
						}}
					>
						{Array(cols)
							.fill()
							.map((v, i) => (
								<Column key={i} id={i} height={colsHeight[i]} onClick={this.onClick} />
							))}
					</div>
				</div>
			)
      } else if(phase === "fail"){
         return (
         <div className='square border-r' onContextMenu={e=>this.onContextMenu(e)}>
               <h3>Failed!</h3>
					You didn't keep the columns from hitting the bottom. The sky hasn't fallen though. Click <b style={{cursor: "pointer"}} onClick={this.intro}>here</b> to try again. 
				</div>
         )
      } else if(phase === "success"){
         return (
            <div className="border-g" onContextMenu={e=>this.onContextMenu(e)}>
               <h3>Success!</h3>
               You kept the columns from falling within the time limit. Congratulations!
               <br /><br />
               Click <strong style={{cursor: "pointer"}} onClick={this.intro}>here</strong> to continue
            </div>
         )
      }
	}
}

class Column extends Component {
	style = {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		verticalAlign: 'bottom',
		justifyContent: 'flex-end'
	}

	render() {
		const { height, onClick, id } = this.props
		return (
			<div className='column' onClick={e=>onClick(e,id)} onContextMenu={e=>onClick(e,id)} style={this.style}>
				<div className='blue' style={{ height: `${height}%` }} />
			</div>
		)
	}
}
