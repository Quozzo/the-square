import React, { Component } from 'react'

export default class Noise extends Component {
    constructor(){
        super()
        this.div = React.createRef();
        this.state = {
            phase: "intro",
            totalSquares: 5,
            squares: 0
        }
    }

    start = () => {
        this.nextSquare()
        this.setState({
            phase: "prep"
        })
    }

    rand = max => {
        return Math.floor(Math.random() * max)
    }

    nextSquare = () => {
        const { squares, totalSquares } = this.state
        if(squares < totalSquares){
            this.setState({
                coords: [this.rand(460)+20, this.rand(460)+20],
                squares: squares+1
            })
        }else{
            this.setState({
                phase: "start"
            })
        }
    }

    mouseMove = e => {
        const { phase, coords } = this.state
        if(phase !== "start") return
        console.log(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        this.div.current.style.left = (e.pageX - e.target.offsetLeft) + "px"
        this.div.current.style.top = (e.pageY - e.target.offsetTop) + "px"
        console.log(this.div.current)
    }

    guess = e => {

    }

	render() {
        const { phase, coords } = this.state
        if(phase === "intro"){
            return (
                <div className="square border-b" onClick={this.start}>
                    <h3>Noise</h3>
                    <p>A square will appear in several locations before disappearing at one location which will not reappear. Remember its last position because multiple other squares will distract you from its location. Try to click on the last position of the square, if you can.</p>
                </div>
            )
        }else if(phase === "prep"){
            return (
                <div className="square" style={{padding: "0", border: "1px solid blue"}}>
                    <Square coords={coords} nextSquare={this.nextSquare}/>
                </div>
            )
        }else if(phase === "start"){
            return (
                <div className="square" style={{padding: "0", border: "1px solid blue"}} onMouseMove={this.mouseMove} onClick={this.guess}>
                    <div className="blue" style={{position: "relative", width: "20px", height: "20px"}} ref={this.div}/>
                </div>
            )
        }
	}
}

class Square extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        const { nextSquare } = this.props
        setTimeout(() => {
            nextSquare()
        }, 2000)        
    }

    componentDidUpdate(){
        const { nextSquare } = this.props
        setTimeout(() => {
            nextSquare()
        }, 2000)  
    }

    position = () => {
        const { coords } = this.props
        return {
            position: "relative",
            top: coords[0],
            left: coords[1],
            width: "20px",
            height: "20px"
        }
    }

    render() {
        return (
            <div className="red" style={this.position()}>
                
            </div>
        )
    }
}

