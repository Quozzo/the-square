import React, {useState, useEffect} from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

const Swatch = () => {

    const [count, setCount] = useState(0)
    const [swatches, setSwatches] = useState([])
    const [game, setGame] = useState("intro")
    const [timer, setTimer] = useState()

    //Need to check the 10th click to see if success/fail

    const onClick = e => {
        e.preventDefault()
        if(count >= swatches.length-1){
            setCount(0)
            setSwatches([])
            setGame("success")
        }else if(
            (swatches[count] === 0 && e.type === "contextmenu")
            || (swatches[count] === 1 && e.type === "click")
        ){
            setCount(count+1)
        }
        else{
            setCount(0)
            setGame("fail")
        }
    }

    const classes = () => {
        console.log("classes")
        let classes = ["square"]
        if(game === "start") classes.push(swatches[count] === 0 ? "red" : "blue")
        if(game === "intro") classes.push("border-b")
        else if(game === "success") classes.push("border-g")
        else if(game === "fail") classes.push("border-r")
        return classes.join(" ")
    }

    console.log(timer)

    const start = () => {
        if(!swatches.length){
            Array(10).fill().forEach((v, i) => {
                swatches.push(Math.floor(Math.random() * 2))
            })
        }
        
        if(!timer){
            console.log("begin")
            setTimer(setTimeout(()=>{
                //if(game === "start"){
                    console.log(game)
                    //setGame("fail")
            }, 10000))
        }
        setGame("start");
    }

    if(game === "start"){
        return <div className={classes()} onClick={onClick} onContextMenu={onClick}></div>
    }else if(game === "intro"){
        return <div className={classes()} onClick={start}><h3>Swatch</h3>Different coloured swatches will appear in the square, you must press the correct mouse button when the coloured swatch appears. Right is for Red and Left is for Blue. You must complete it within 10 seconds.<br/><br/>Click the Square to begin.</div>
    }else if(game === "success"){
        return <div className={classes()} onClick={()=>setGame("intro")}>Well Done!</div>
    }else if(game === "fail"){
        return <div className={classes()} onClick={()=>setGame("intro")}>Too bad :( Click to try again</div>
    }
}

export default Swatch
