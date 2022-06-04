import React,{useContext,useEffect} from 'react'
import { ScoreContext } from '../Context/ScoreContext'

const ScoreBoard = (props) => {

  const {setDATA,DATA} = useContext(ScoreContext)
  useEffect(() => {
    setDATA({
      ...DATA,
      Score:props.score
    })
  }, [props.score]);

  return (
    <div className="score-board">
      <h2>{props.score}</h2>
    </div>
  )
}

export default ScoreBoard
