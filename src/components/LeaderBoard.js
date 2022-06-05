import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Style from './LeaderBoard.module.css'

const LeaderBoard = () => {
    const [apidata, setApidata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://candytwist-node-deploy.herokuapp.com/scoreBoard").then(res=>setApidata(res.data)).catch(err=>console.log(err))
    }, []);

  return (
    <div className={Style.main}>
        <p>Leaderboard</p>
        {
            apidata.length?
            apidata.map((val,index)=>{return(
                <div className={Style.score} key ={index}>
                    <p>{val.Username}</p>
                    <p>{val.Score}</p>
                    
                </div>
            )}
            )
            :""
        }
        <div className={Style.score_link}>
            <p onClick={()=>{navigate("/leaderBoard")}}>View Full LeaderBoard</p>
        </div>
    </div>
  )
}

export default LeaderBoard