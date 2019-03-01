import React, { Component } from 'react'

export default class Repitition extends Component {
    constructor(){
        super()
        this.state = {
            phase: "intro",
            step: 0,
            steps: 0,
            ai: true,
            sequence: [[this.rand(5), this.rand(5)]]
        }
    }

    rand = max => {
        return Math.floor(Math.random() * max)
    }

    onClick = () => {
        this.setState({
            phase: "start"
        })
    }

    guess = (x, y) => {
        const {sequence} = this.state
        let {step, steps} = this.state
        if(x === sequence[step][0] && y === sequence[step][1]){
            if(step === steps){// if at end of sequence
                this.setState({
                    sequence: [...sequence, [this.rand(5), this.rand(5)]],
                    step: ++step,
                    steps: ++steps
                })
            }else if(step < steps){ //correct but not at end
                this.setState({
                    step: ++step
                })
            }
        }
    }

    render() {
        const {phase, sequence, step} = this.state
        if(phase === "intro"){
            return <div className="square border-b" onClick={this.onClick}><h3>Repitition</h3>Remember the sequence which will gradular harder everytime you get it right.</div>
        }else if(phase === "start"){
            return (
                <div className="square">
                    <table><tbody>
                        {Array(5).fill().map((v, cellY) => (
                            <tr key={`row-${cellY}`}>
                                {Array(5).fill().map((v, cellX) => (
                                    <td key={`cell=${cellX}-${cellY}`} onClick={()=>this.guess(cellX, cellY)}>
                                        {cellX === sequence[step][0] && cellY === sequence[step][1] && <Square />}
                                    </td>
                                )) }
                            </tr>
                        )) }
                    </tbody></table>
                </div>
            )
        }
    }
}

class Square extends Component {
    render() {
        return (
            <div className="red">

            </div>
        )
    }
}

