import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const FullLeaderBoard = () => {
    const [apidata, setApidata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://candytwist-node-deploy.herokuapp.com/scoreBoard").then(res=>setApidata(res.data)).catch(err=>console.log(err))
    }, []);

  return (
    <div style={{width:"100%"}}>
        <p style={{textAlign:"center"}}>Leaderboard</p>
        {
            apidata.length?
            apidata.sort(function (a, b) {
                var scoreA = a.Score, scoreB = b.Score
                if (scoreA < scoreB)
                  return -1
                if (scoreA > scoreB)
                  return 1
                return 0
              }).map((val,index)=>{return(
                <div style={{display:"flex" ,width:"100%",justifyContent:"space-evenly"}} key ={index}>
                    <p>{val.Username}</p>
                    <p>{val.Score}</p>
                </div>
            )}
            )
            :"Loading..."
        }
    </div>
  )
}

export default FullLeaderBoard