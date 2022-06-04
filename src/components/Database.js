import React, { useContext} from 'react'
import axios from 'axios'
import { ScoreContext } from '../Context/ScoreContext'


const Database = () => {

  const{DATA, setDATA} =  useContext(ScoreContext);

  const changeHandler=(e)=>{
    e.preventDefault()
    setDATA({
      ...DATA,
      Username:e.target.value
    })
  }


  const submitHandler = (e)=>{
    e.preventDefault()
    axios.post("https://candytwist-node-deploy.herokuapp.com/score",DATA)
    .then(res=>{alert(res.status===200?"Score added":"Something went wrong!")
  window.location.reload()
  })
    .catch(err=>console.log(err))
  }

  return (
    <div>
      {console.log(DATA)}
      <form onSubmit={submitHandler}>
      <input required type="text" onChange={changeHandler} />
      <button type='submit'>Submit Score</button>
      </form>
    </div>
  )
}

export default Database
