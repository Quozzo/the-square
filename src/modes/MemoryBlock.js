import React, { Component } from 'react'
import { throws } from 'assert';

export default class MemoryBlock extends Component {
    constructor(){
        super()
        this.started = false
        this.state = {
            phase: "intro",
            num: 10, //Total number of squares
            size: 10, //Size of the grid in X and Y
            remove: 1, //Number of squares to remove
        }
        this.removed = this.state.remove
    }

    rand = max => {
        return Math.floor(Math.random() * max)
    }

    start = () => {
        let i = this.state.num, j = this.state.remove, sqr = [], remove = []
        while(j){
            let removedNum = this.rand(this.state.num)+1
            if(remove.indexOf(removedNum)>-1) continue
            remove.push(removedNum)
            j--
        }
        remove = remove.sort()

        while(i){
            let x = this.rand(this.state.size)
            let y = this.rand(this.state.size)
            let rem = remove.indexOf(i) > -1
            if(!sqr[y]) sqr[y] = []
            if(!sqr[y][x]){
                sqr[y][x] = {marked: true, remove: rem}
                i--
            }
        }
        this.squares = sqr
        console.log(remove, sqr)
        this.setState({phase: "start"})
    }

    onClick = r => {        
        if(!this.started) return
        const {phase} = this.state 
        if(phase === "success" || phase === "fail"){
            this.reset()
            return
        }
        if(!r) {
            this.setState({
                phase: "fail"
            })
            this.resetTimer = setTimeout(()=>{
                this.reset()
            }, 5000)
            return
        }
        this.removed = this.removed - 1
        if(this.removed) return
        this.setState({
            phase: "success"
        })
        this.resetTimer = setTimeout(()=>{
            this.reset()
        }, 5000)
    }

    init = () => {
        this.started = true
    }

    reset = () => {
        clearInterval(this.resetTimer)
        this.started = false
        this.removed = this.state.remove
        this.setState({
            phase: "intro"
        })
    }

    render() {
        const {phase, num, size, remove} = this.state
        if(phase === "intro"){
            return (
                <div className="square border-b" onClick={this.start}>
                    <h3>Memory Block</h3>
                    {num} squares will appear on the screen. Remember where they are before they disappear because you might be missing {remove} when they return. Click on the missing square{remove>1?"s":""}, if you can!<br/><br/>Click to begin.
                </div>
            )
        }else if(phase === "start" || phase === "fail" || phase === "success"){
            return (
                <div className="square">
                    <table><tbody>
                        {Array(size).fill().map((v, i)=>{
                            return (
                                <tr key={`row-${i}`}>
                                    {Array(size).fill().map((v, j)=>{
                                        const isSquare = this.squares[i] && this.squares[i][j]
                                        const square = isSquare ? this.squares[i][j] : undefined
                                        const removeIt = isSquare && square.remove
                                        return (
                                            <td key={`cell-${i}-${j}`} onClick={()=>this.onClick(removeIt)}>
                                                {isSquare?<Square remove={removeIt} phase={phase} init={this.init} />:""}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody></table>
                </div>
            )
        }
    }
}

class Square extends React.Component {
    constructor(){
        super()
        this.state = {
            shown: "shown"
        }
    }

    componentDidMount = () => {
        const {phase, remove, init} = this.props
        if(phase === "start"){
            setTimeout(()=>{
                this.setState({
                    shown: "hidden",
                })

                if(!remove){
                    setTimeout(()=>{
                        this.setState({
                            shown: "shown"
                        })
                        init()
                    }, 1000)
                }

            }, 2000)
        }
    }

    classes = () => {
        const {phase, remove} = this.props
        const {shown} = this.state
        let classes = phase === "fail" && remove ? ["red"] 
            : phase === "success" && remove ? ["green"] : ["blue"]
        if(remove && phase === "start") classes.push("remove")
        if(shown === "shown" || phase !== "start") classes.push("shown")
        else if(shown === "hidden") classes.push("hidden")
        return classes.join(" ")
    }

    render(){
        return (
            <div className={this.classes()}></div>
        )
    }
}
