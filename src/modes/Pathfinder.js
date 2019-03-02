import React, { Component } from 'react'

export default class Pathfinder extends Component {
    constructor(){
        super()
        this.state = {
            phase: "intro"
        }
    }

    generatePath = () => {
        
    }
    

    start = () => {
        this.generatePath()
        this.setState({
            phase: "start"
        })
    }

    guess = (x, y) => {
        console.log(x, y)
    }
    
    render() {
        const { phase } = this.state
        if(phase === "intro") {
            return <div class='square border-b' onClick={this.start}><h3>Pathfinder</h3>A path through the square will be shown briefly before it disappears. You must navigate through the square using the same path. Start at the edge and work your way through to the other side by clicking on the squares and creating your path.</div>
        }else if(phase === "start"){
            return (
                <div className="square">
                    <table><tbody>
                        {Array(10).fill().map((v, cellY) => (
                            <tr key={`row-${cellY}`}>
                                {Array(10).fill().map((v, cellX) => (
                                    <td key={`cell=${cellX}-${cellY}`} onClick={()=>this.guess(cellX, cellY)}>
                                    
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
