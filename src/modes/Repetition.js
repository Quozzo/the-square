import React, { Component } from 'react'
import { RSA_NO_PADDING } from 'constants';

export default class Repetition extends Component {
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

    roll = () => {
        const { sequence, step } = this.state
        let x, y
        while((!x || x === sequence[step][0]) && (!y || y === sequence[step][1])){
            x = this.rand(5)
            y = this.rand(5)
        }
        return [x, y]
    }

    guess = (x, y) => {
        const {sequence, phase} = this.state
        let {step, steps} = this.state
        if(phase === "ai") return
        if(x === sequence[step][0] && y === sequence[step][1]){
            if(step === steps){// if at end of sequence
                this.setState({
                    sequence: [...sequence, this.roll()],
                    steps: ++steps,
                    phase: "ai",
                    step: 0
                })
            }else if(step < steps){ //correct but not at end
                this.setState({
                    step: ++step
                })
            }
        }else if(phase === "fail"){
            this.reset()
        }else{
            this.setState({
                phase: "fail"
            })
        }
    }

    outro = () => {
        this.setState({
            phase: "outro"
        })
    }
    
    reset = () => {
        this.setState({            
            phase: "intro",
            step: 0,
            steps: 0,
            sequence: [[this.rand(5), this.rand(5)]]            
        })
    }

    render() {
        const {phase, sequence, step, steps, hidden} = this.state
        if(phase === "intro"){
            return <div className="square border-b" onClick={this.onClick}><h3>Repetition</h3>Remember the sequence of squares which will get gradually harder everytime you get it right.</div>
        }else if(phase === "outro"){
            return <div className="square border-r" onClick={this.reset}><h3>You clicked the wrong square</h3>You got {steps} steps correct in the last round</div>
        }else if(phase === "start" || phase === "ai" || phase === "fail"){
            return (
                <div className="square">
                    <table><tbody>
                        {Array(5).fill().map((v, cellY) => (
                            <tr key={`row-${cellY}`}>
                                {Array(5).fill().map((v, cellX) => (
                                    <td key={`cell=${cellX}-${cellY}`} onClick={()=>this.guess(cellX, cellY)}>
                                        {phase === "ai" && cellX === sequence[step][0] && cellY === sequence[step][1] && <Square phase={phase} nextStep={this.nextStep} />}
                                        {phase === "fail" && sequence[step][0] === cellX && sequence[step][1] === cellY && <Square phase={phase} outro={this.outro}/> }
                                        {phase === "start" && sequence[step-1] && sequence[step-1][0] === cellX && sequence[step-1][1] === cellY && <Square phase={phase} nextStep={this.nextStep} /> }
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
    const {phase, nextStep, hidden, outro} = this.props         
        if(phase === "ai"){
            this.timer = setTimeout(() => {
                nextStep()
            }, 1000);            
        }else if(phase === "fail"){
            this.timer = setTimeout(() => {
                outro()
            }, 2000);
        }else if(phase === "start"){
            this.timer = setTimeout(() => {
                this.setState({
                    display: false
                })
            }, 1000);            
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    classes = () => {
        const { phase } = this.props
        return !this.state.display ? "hidden" : phase === "ai" ? "blue" : phase === "fail" ? "red" : "green"
    }

    render() {
        return (
            <div className={this.classes()}></div>
        )
    }
}

