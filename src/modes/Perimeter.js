import React, { Component } from 'react'
import { listenerCount } from 'events';

export default class Perimeter extends Component {
    constructor(){
        super()
        this.state = {
            phase: "intro",
            text: "Start",
            coord: [5, 0]
            
        }
    }

    startGame = () => {
        const {phase, coord: [x, y]} = this.state
        if(this.state.phase === "start"){
            if(x === 5 && y === 0){
                this.setState({
                    phase: "success"
                })
            }else{
                this.setState({
                    phase: "fail"
                })
            }
        }else if(phase === "fail" || phase === "success"){
            this.setState({
                phase: "intro"
            })
        }
    }

    position = starting => {
        if(!(this.state.phase === "start" || starting)) return
        let [x, y] = this.state.coord

        if (x === 0 && y !== 10) y++
        else if (y === 0 && x !== 0) x--
        else if (y === 10 && x !== 10) x++
        else if (x === 10 && y !== 0) y--

        this.setState({
            coord: [x, y]
        })
    }

    border = (cellX, cellY) => {
        if(!(cellX === 0 || cellX === 10 || cellY === 0 || cellY === 10)){
            return {border: 0}
        }else if(cellX === 5 && cellY === 0){
            return {border: "2px solid green"}
        }
    }

    render() {
        const {phase, coord: [x, y]} = this.state
        if(phase === "intro"){
            return (
                <div className="square border-b" onClick={()=>this.setState({phase: "start"})}><h3>Perimeter</h3>A square will orbit the perimeter, click when the square is at the starting poistion.</div>
            )
        }else if(phase === "start" || phase === "prep" || phase === "stop" || phase === "fail" || phase === "success") {
            return (
                <div className="square" id="perimeter">
                    <table className='table'><tbody>
                        {Array(11).fill().map((v, cellY)=>{
                            return (
                                <tr className='row' key={`row-${cellY}`}>
                                    {Array(11).fill().map((v, cellX)=>(
                                        <td className='cell'
                                            key={`cell-${cellY}-${cellX}`}
                                            style={this.border(cellX, cellY)}
                                            onClick={this.startGame}
                                        >
                                        {cellX === x && cellY === y && <Square position={this.position} phase={phase}/>}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody></table>
                </div>
            )
        }
    }
}

class Square extends Component {

    componentDidMount(){
        if(this.props.phase === "start"){
            this.timer = setTimeout(()=>{
                this.props.position()
            }, 50)
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    classes = () => {
        return this.props.phase === "success" ? "green" : this.props.phase === "fail" ? "red" : "blue"
    }

    render() {
        return (
            <div className={this.classes()}></div>
        )
    }
}

