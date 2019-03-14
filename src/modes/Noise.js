import React, { Component } from 'react'

export default class Noise extends Component {
    constructor(){
        super()
        this.div = React.createRef()
        this.container = React.createRef()
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
        let left = e.pageX
        let top = e.pageY
        left = left < this.container.current.offsetLeft+10 ? this.container.current.offsetLeft+10 : left
        left = left > this.container.current.offsetLeft+500-10 ? this.container.current.offsetLeft+500-10 : left
        top = top < this.container.current.offsetTop+10 ? this.container.current.offsetTop+10 : top
        top = top > this.container.current.offsetTop+500-10 ? this.container.current.offsetTop+500-10 : top
        this.left = left
        this.top = top
        this.div.current.style.left = (left-10)+"px"
        this.div.current.style.top = (top-10)+"px"
        console.log(left, top)
    }

    position = () => {
        const { coords } = this.state
        return {
            position: "relative",
            top: coords[0],
            left: coords[1],
            width: "30px",
            height: "30px"
        }
    }

    guess = e => {
        const { coords } = this.state


        let left = e.pageX
        let top = e.pageY
        left = left < this.container.current.offsetLeft+10 ? this.container.current.offsetLeft+10 : left
        left = left > this.container.current.offsetLeft+500-10 ? this.container.current.offsetLeft+500-10 : left
        top = top < this.container.current.offsetTop+10 ? this.container.current.offsetTop+10 : top
        top = top > this.container.current.offsetTop+500-10 ? this.container.current.offsetTop+500-10 : top
        
        left = left - this.container.current.offsetLeft
        top = top - this.container.current.offsetTop
        console.log(left, coords[0], top, coords[1])
        if(
            left > coords[0] && left < coords[0] + 50 &&
            top > coords[1] && top < coords[1] + 50
        ){
            this.setState({
                phase: "success"
            })
        }else{
            this.setState({
                phase: "fail"
            })
        }
    }

    classes = () => {
        const { phase } = this.state
        return phase === "fail" ? "red" : phase === "success" ? "green" : "blue"
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
        }else if(phase === "start" || phase === "fail" || phase === "success"){
            return (
                <div className="square" style={{padding: "0", border: "1px solid blue"}} onMouseMove={this.mouseMove} onClick={this.guess} ref={this.container}>
                    {phase === "success" || phase === "fail" && <div className="blue" style={this.position()} />}
                    <div className={this.classes()} style={{position: "absolute", width: "20px", height: "20px"}} ref={this.div}/>
                </div>
            )
        }
	}
}

class Movable extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
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
            width: "30px",
            height: "30px"
        }
    }

    render() {
        return (
            <div className="blue" style={this.position()}>
                
            </div>
        )
    }
}

