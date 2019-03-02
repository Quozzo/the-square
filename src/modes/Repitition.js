import React, { Component } from 'react'

export default class Repitition extends Component {
    constructor(){
        super()
        this.state = {
            phase: "intro",
            step: 0,
            steps: 0,
            sequence: [[this.rand(5), this.rand(5)]]
        }
    }

    rand = max => {
        return Math.floor(Math.random() * max)
    }

    onClick = () => {
        this.setState({
            phase: "ai"
        })
    }

    nextStep = () =>{
        let {step, steps} = this.state
        if(step < steps){
            this.setState({
                step: ++step
            })
        }else{
            this.setState({
                phase: "start",
                step: 0
            })
        }
    }

    guess = (x, y) => {
        const {sequence, phase} = this.state
        let {step, steps} = this.state
        if(phase === "ai") return
        if(x === sequence[step][0] && y === sequence[step][1]){
            if(step === steps){// if at end of sequence
                this.setState({
                    sequence: [...sequence, [this.rand(5), this.rand(5)]],
                    steps: ++steps,
                    phase: "ai",
                    step: 0
                })
            }else if(step < steps){ //correct but not at end
                this.setState({
                    step: ++step
                })
            }
        }
    }

    render() {
        const {phase, sequence, step, hidden} = this.state
        if(phase === "intro"){
            return <div className="square border-b" onClick={this.onClick}><h3>Repitition</h3>Remember the sequence which will gradular harder everytime you get it right.</div>
        }else if(phase === "start" || phase === "ai"){
            return (
                <div className="square">
                    <table><tbody>
                        {Array(5).fill().map((v, cellY) => (
                            <tr key={`row-${cellY}`}>
                                {Array(5).fill().map((v, cellX) => (
                                    <td key={`cell=${cellX}-${cellY}`} onClick={()=>this.guess(cellX, cellY)}>
                                        {!hidden && phase === "ai" && cellX === sequence[step][0] && cellY === sequence[step][1] && <Square phase={phase} nextStep={this.nextStep} />}
                                        {/*phase === "start" && sequence[step-1] && sequence[step][0] === cellX && sequence[step][0] === cellY && <Square phase={phase} nextStep={this.nextStep} />*/ }
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
    constructor(){
        super()
        this.state = {
            display: true
        }
    }

    componentDidMount(){
    const {phase, nextStep, hidden} = this.props 
        this.timer = setTimeout(()=>{
            if(phase === "ai"){
                nextStep()
            }else{
                this.setState({
                    display: false
                })
            }
        }, 1000)
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
        clearTimeout(this.nextSquare)
    }

    classes = () => {
        return !this.state.display ? "hidden" : this.props.phase === "ai" ? "blue" : "green"
    }

    render() {
        return (
            <div className={this.classes()}></div>
        )
    }
}

