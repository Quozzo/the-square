import React from 'react'

class Swatch extends React.Component {

    constructor(){
        super()
        this.num = 20
        this.timeLimit = 10000
        this.state = {
            count: 0,
            swatches: [],
            game: "intro"
        }
    }

    onClick = e => {
        e.preventDefault()
        const {count, swatches} = this.state
        const correct = (swatches[count] === 0 && e.type === "contextmenu")
            || (swatches[count] === 1 && e.type === "click")
            
        if(correct){
            this.setState({
                count: count+1
            })

            if(count === swatches.length-1){
                this.setState({
                    count: 0,
                    swatches: [],
                    game: "success"
                })
                clearInterval(this.timer)
            }

        }else{
            this.setState({
                count: 0,
                game: "fail"
            })
            clearInterval(this.timer)
        }
    }

    classes = () => {
        const {game, swatches, count} = this.state
        let classes = ["square"]
        if(game === "start") classes.push(swatches[count] === 0 ? "red" : "blue")
        if(game === "intro") classes.push("border-b")
        else if(game === "success") classes.push("border-g")
        else if(game === "fail") classes.push("border-r")
        else if(game === "timer") classes.push("border-r")
        return classes.join(" ")
    }

    start = () => {
        const {swatches} = this.state
        if(!swatches.length){
            Array(this.num).fill().forEach((v, i) => {
                swatches.push(Math.floor(Math.random() * 2))
            })
        }
        
        this.now = Date.now()
        this.timer = setTimeout(()=>{
            this.setState({
                count: 0,
                game: "timer"                
            })
        }, this.timeLimit)

        this.setState({
            game: "start"
        })
    }

    render(){
        const {game} = this.state
        if(game === "start"){
            return <div className="square"><div className={this.classes()} onClick={this.onClick} onContextMenu={this.onClick}></div></div>
        }else if(game === "intro"){
            return <div className={this.classes()} onClick={this.start}><h3>Swatch</h3>Different coloured swatches will appear in the square, you must press the correct mouse button when the coloured swatch appears. Right is for Red and Left is for Blue. You must complete it within {this.timeLimit/1000} seconds.<br/><br/>Click the Square to begin.</div>
        }else if(game === "success"){
            return <div className={this.classes()} onClick={()=>this.setState({game:"intro"})}><h3>Well Done!</h3>You had {(this.timeLimit - (Date.now() - this.now))/1000}s remaining</div>
        }else if(game === "fail"){
            return <div className={this.classes()} onClick={()=>this.setState({game:"intro"})}><h3>Wrong Click</h3>You clicked the wrong button on the mouse :(</div>
        }else if(game === "timer"){
            return <div className={this.classes()} onClick={()=>this.setState({game:"intro"})}><h3>Too Slow</h3>The timer has expired because you were too slow. Try going faster next time.</div>
        }
    }
}

export default Swatch
