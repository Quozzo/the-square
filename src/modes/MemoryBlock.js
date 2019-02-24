import React, { Component } from 'react'

export default class MemoryBlock extends Component {
    constructor(){
        super()
        this.started = false
        this.state = {
            phase: "intro",
            num: 10, //Total number of squares
            size: 10, //Size of the grid in X and Y
            remove: 2, //Number of squares to remove
            good: 0,
            bad: 0,
            squares: null
        }
        this.good = 0
        this.bad = this.state.remove
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
                sqr[y][x] = {remove: rem}
                i--
            }
        }
        this.setState({phase: "start", squares: sqr})
    }

    guess = (r, x, y) => {        
        if(!this.started) return
        let {phase, good, squares, bad, remove} = this.state 
        if(phase === "success" || phase === "fail"){
            this.reset()
            return
        }
        if(!r) {
            bad++
            if(!squares[x]) squares[x] = []
            if(!squares[x][y]) squares[x][y] = {}
            squares[x][y].fail = true
            this.setState({
                squares,
                bad
            })
            if(bad >= remove){
                this.setState({
                    phase: "fail"
                })
            }
            this.resetTimer = setTimeout(()=>{
                this.reset()
            }, 5000)
            return
        }else{
            good++
            squares[x][y].success = true
            this.setState({
                    good,
                    squares
            })
            if(good >= remove){
                this.setState({
                    phase: "success"
                })
            }
            this.resetTimer = setTimeout(()=>{
                this.reset()
            }, 5000)
        }
    }

    init = () => {
        this.started = true
    }

    reset = () => {
        clearTimeout(this.resetTimer)
        this.started = false
        this.setState({
            phase: "intro",
            squares: null,
            bad: 0,
            good: 0,
            removed: 0
        })
    }

    componentWillUnmount(){
        clearTimeout(this.resetTimer)
    }

    render() {
        const {phase, num, size, remove, squares} = this.state
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
                                        const isSquare = squares[i] && squares[i][j]
                                        const square = isSquare ? squares[i][j] : undefined
                                        const removeIt = isSquare && square.remove
                                        return (
                                            <td key={`cell-${i}-${j}`} onClick={()=>this.guess(removeIt, i, j)}>
                                                {square?<Square info={square} phase={phase} init={this.init} />:""}
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
    constructor(props){
        super()
        this.state = {
            shown: "shown"
        }
    }

    componentDidMount = () => {
        const {info: {remove, fail, success}, phase, init} = this.props
        if((!success || !fail) && phase === "start"){
            this.timer = setTimeout(()=>{
                this.setState({
                    shown: "hidden",
                })

                if(!remove && (!success || !fail)){
                    this.timeout = setTimeout(()=>{
                        this.setState({
                            shown: "shown"
                        })
                        init()
                    }, 1000)
                }

            }, 2000)
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
        clearTimeout(this.timeout)
    }

    classes = () => {
        const {info: {remove, success, fail}, phase} = this.props
        const classes = []        

        if(fail) classes.push("red")
        else if(success) classes.push("green")
        else if(phase === "fail" && remove) classes.push("green")
        else if(this.state.shown === "shown") classes.push("blue")
        else classes.push("hidden")

        return classes.join(" ")
    }

    render(){
        return (
            <div className={this.classes()}></div>
        )
    }
}
