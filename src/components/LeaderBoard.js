import axios from 'axios';
import React,{useEffect,useState} from 'react'

const LeaderBoard = () => {
    const [apidata, setApidata] = useState([]);

    useEffect(() => {
        axios.get("https://candytwist-node-deploy.herokuapp.com/scoreBoard").then(res=>setApidata(res.data)).catch(err=>console.log(err))
    }, []);

  return (
    <div>
        {
            apidata.length?
            apidata.map((val,index)=>{return(
                <div style={{display:"flex"}} key ={index}>
                    <p>{val.Score}</p>
                    <p>{val.Username}</p>
                </div>
            )}
            )
            :""
        }
    </div>
  )
}

export default LeaderBoard