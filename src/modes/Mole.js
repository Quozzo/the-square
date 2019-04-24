import React, { Component } from 'react'
import Table from '../Tables'

export default class Mole extends Component {
    constructor(){
        super()
        this.state = {
            size: 10,
            squares: 20,
            phase: "intro",
            good: 0,
            x :null,
            y: null,
            timeLimit: 1000
        }
    }

    clicked = (clickedX, clickedY) => {
        clearTimeout(this.timer)
        const {x, y, squares} = this.state
        let {good} = this.state
        console.log(x, y, clickedX, clickedY)
        if(clickedX === x && clickedY === y){
            good++
            if(good === squares){
                this.setState({
                    phase: "success"
                })
                return
            }
            this.randomSquare()
            this.setState({
                good
            })
        }
    }

    rand = (max) => {
        return Math.floor(Math.random() * max)
    }

    randomSquare  = () => {
        let x, y
        const coords = () => {
            x = this.rand(this.state.size)
            y = this.rand(this.state.size)
        }
        coords()
        this.setState({
            x,
            y
        })
    }

    start = () => {
        this.randomSquare()
        this.setState({
            phase: "start",
            good: 0,
        })
    }

    fail = () => {
        this.setState({
            phase: "fail"
        })
    }

    render() {
        const {size, phase, x, y, good, squares, timeLimit} = this.state
        if(phase === "intro"){
            return <div className="square border-b" onClick={this.start}><h3>Mole</h3>You need to click on each square within the given time. The timer restarts every time each "Mole" clicked on.<br/><br/>Click to begin</div>
        }else if(phase === "start"){
            return (
                <div className="square">
                    <Table rows={size} cols={size} onClick={(row, col)=>{this.clicked(col, row)}}
                        render={(cellY, cellX)=>{
                            return cellX === x && cellY === y && <Square fail={this.fail} timeLimit={timeLimit}/>
                        }}
                    />
                </div>
            )
        }else if(phase === "success"){
            return <div onClick={()=>this.setState({phase: "intro"})} className="border-g"><h3>Well Done!</h3>You clicked on each square within the time limit!</div>
        }else if(phase === "fail"){
            return <div className="border-r" onClick={()=>this.setState({phase: "intro"})}><h3>Too slow</h3>Sorry. You clicked on {good} out of {squares}<br/><br/>Click to try again</div>
        }
    }
}

class Square extends Component {

    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.props.fail()
        }, this.props.timeLimit)
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    render() {
        return (
            <div className="blue"></div>
        )
    }
}