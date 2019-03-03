import React, { Component } from 'react'

export default class Pathfinder extends Component {
    constructor(){
        super()
        this.state = {
            phase: "intro",
            size: 5,
            coords: [],
        }
    }

    rand = (max) => {
        return Math.floor(Math.random() * max)
    }

    corners = () => {
        const { size } = this.state
        const coords = []
        const flow = {"start": "start", "up": "down", "down": "up", "left": "right", "right": "left"}

        let limit = size * size
        let target
        let steps = 1
        let coordX = 0
        let coordY = 0

        coords[0] = []
        coords[0][0] = {step: 1, move: "start"}

        let prev = coords[0][0]

        while(limit--){
            let directions = []

            const up = coordY-1 >= 0 && !(coords[coordX] && coords[coordX][coordY-1])
            if(up) directions.push("up")
            const down = coordY+1 <= size-1 && !(coords[coordX] && coords[coordX][coordY+1])
            if(down) directions.push("down")
            const left = coordX-1 >= 0 && !(coords[coordX-1] && coords[coordX-1][coordY])
            if(left) directions.push("left")
            const right = coordX+1 <= size-1 && !(coords[coordX+1] && coords[coordX+1][coordY])
            if(right) directions.push("right")

            if(!directions.length){
                prev.path = `${prev.move}-end`
                prev.move = `end`               
                break
            }

            let dir = directions[this.rand(directions.length)]

            if(dir === "up"){
                coordY = coordY-1
                if(!coords[coordX]) coords[coordX] = []
                coords[coordX][coordY] = {step: ++steps, move: dir}
                target = coords[coordX][coordY]                
            }else if(dir === "down"){
                coordY = coordY+1
                if(!coords[coordX]) coords[coordX] = []
                coords[coordX][coordY] = {step: ++steps, move: dir}
                target = coords[coordX][coordY]                
            }else if(dir === "left"){
                coordX = coordX-1
                if(!coords[coordX]) coords[coordX] = []
                coords[coordX][coordY] = {step: ++steps, move: dir}
                target = coords[coordX][coordY]                
            }else if(dir === "right"){
                coordX = coordX+1
                if(!coords[coordX]) coords[coordX] = []
                coords[coordX][coordY] = {step: ++steps, move: dir}
                target = coords[coordX][coordY]                
            }

            prev.path = `${flow[prev.move]}-${dir}`
            prev = target
        }

        this.setState({
            coords
        })

        console.log(coords)
    }

    start = () => {
        this.corners()
        this.setState({
            phase: "start"
        })
    }

    guess = (x, y) => {
        console.log(x, y)
    }
    
    render() {
        const { phase, coords, path, size } = this.state
        if(phase === "intro") {
            return <div className='square border-b' onClick={this.start}><h3>Pathfinder</h3>A path through the square will be shown briefly before it disappears. You must navigate through the square using the same path. Start at the edge and work your way through to the other side by clicking on the squares and creating your path.</div>
        }else if(phase === "start"){
            return (
                <div className="square">
                    <table><tbody>
                        {Array(size).fill().map((v, cellY) => (
                            <tr key={`row-${cellY}`}>
                                {Array(size).fill().map((v, cellX) => (
                                    <td key={`cell=${cellX}-${cellY}`} onClick={()=>this.guess(cellX, cellY)}>
                                        {coords[cellX] && coords[cellX][cellY] && <Square info={coords[cellX][cellY]} />}
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
    }

    classes = () => {
        const { info } = this.props
        let c = ["blue"]
        c.push(info.move)
        c.push(info.path)
        return c.join(" ")
    }

    render() {
        const { info } = this.props
        return (
            <div className={this.classes()} style={{color: "white", fontSize: "48px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                {info.step}
            </div>
        )
    }
}
