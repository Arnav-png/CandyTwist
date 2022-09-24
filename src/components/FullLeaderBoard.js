import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import BG from "../images/BG.png";
import Style from "./LeaderBoard.module.css";

const FullLeaderBoard = () => {
  const [apidata, setApidata] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const [rankText, setrankText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://candytwist-node-deploy.herokuapp.com/scoreBoard")
      .then((res) => setApidata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const sortDecrease = () => {
    const temp = [...apidata].sort(function (a, b) {
      var scoreA = a.Score,
        scoreB = b.Score;
      if (scoreA > scoreB) return -1;
      if (scoreA < scoreB) return 1;
      return 0;
    });

    setApidata(temp);
    setrankText(true)
  };

  const sortIncrease = () => {
    const temp = [...apidata].sort(function (a, b) {
      var scoreA = a.Score,
        scoreB = b.Score;
      if (scoreA < scoreB) return -1;
      if (scoreA > scoreB) return 1;
      return 0;
    });

    setApidata(temp);
    setrankText(true)
  };

  const search = (e) => {
    setsearchtext(e.target.value);
  };

  return (
    <div className={Style.wrapper}>
      <div>
        <img className={Style.imgimg} src={BG} alt="" />
      </div>
      <div style={{ width: "100%" }}>
        <div className={Style.title}>
          <span onClick={()=>{navigate("/")}}>
            <TiArrowLeftThick size={50} />
          </span>
          <p style={{ textAlign: "center" }}>Full Leaderboard</p>
        </div>
        <div className={Style.DataMod}>
          <div>
            <button onClick={sortIncrease}>Sort Increasing</button>
            <button onClick={sortDecrease}>Sort Decreasing</button>
          </div>
          <div className={Style.search__div}>
          <input type="text" onChange={search} placeholder="SEARCH..." />
          <span ><FaSearch /></span>
          </div>
        </div>
        <div className={Style.tableHead}>
        <div style={{textAlign:"center",width:"100%"}}>{rankText?"Rank":"SNo."}</div>
                      <div style={{textAlign:"center",width:"100%"}}>Name</div>
                      <div style={{textAlign:"center",width:"100%"}}>Score</div>
        </div>
        <div className={Style.main}>
          {apidata.length
            ? apidata
                .filter((data) => {
                  if (data === "") {
                    return data;
                  } else if (
                    data.Username.toLowerCase().includes(
                      searchtext.toLowerCase()
                    )
                  ) {
                    return data;
                  }
                })
                .map((val, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                      key={index}
                    >
                      <div style={{textAlign:"center",width:"100%"}}>{index + 1}</div>
                      <div style={{textAlign:"center",width:"100%"}}>{val.Username}</div>
                      <div style={{textAlign:"center",width:"100%"}}>{val.Score}</div>
                    </div>
                  );
                })
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default FullLeaderBoard;
