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
        const path = [[0,0]]

        let directions = []
        let direction = true
        let hundred = 100

        coords[0] = []
        coords[0][0] = 1

        while(hundred--){
            directions = []
            let coordX = path[path.length-1][0]
            let coordY = path[path.length-1][1]

            const up = coordY-1 >= 0 && !(coords[coordX] && coords[coordX][coordY-1])
            if(up) directions.push("up")
            const down = coordY+1 <= size-1 && !(coords[coordX] && coords[coordX][coordY+1])
            if(down) directions.push("down")
            const left = coordX-1 >= 0 && !(coords[coordX-1] && coords[coordX-1][coordY])
            if(left) directions.push("left")
            const right = coordX+1 <= size-1 && !(coords[coordX+1] && coords[coordX+1][coordY])
            if(right) directions.push("right")

            if(!directions.length) break

            let dir = directions[this.rand(directions.length)]

            if(dir === "up"){
                path.push([coordX, coordY-1])
                if(!coords[coordX]) coords[coordX] = []
                coords[coordX][coordY-1] = path.length
            }else if(dir === "down"){
                path.push([coordX, coordY+1])
                if(!coords[coordX]) coords[coordX] = []
                coords[coordX][coordY+1] = path.length
            }else if(dir === "left"){
                path.push([coordX-1, coordY])
                if(!coords[coordX-1]) coords[coordX-1] = []
                coords[coordX-1][coordY] = path.length
            }else if(dir === "right"){
                path.push([coordX+1, coordY])
                if(!coords[coordX+1]) coords[coordX+1] = []
                coords[coordX+1][coordY] = path.length
            }
        }

        this.setState({
            coords,
            path
        })

        console.log(path, coords)
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
                                        {coords[cellX] && coords[cellX][cellY] && <Square x={cellX} y={cellY} number={coords[cellX][cellY]} />}
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
        const { x, y, number } = this.props
        return (
            <div className='blue' style={{color: "white", fontSize: "48px", display: "flex", justifyContent: "center", alignContent: "center"}}>
                {number}
            </div>
        )
    }
}
