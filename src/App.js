//importing hooks
import { useState, useEffect } from "react";
//importing images
import blank from "./images/blank.png";
import blueCandy from "./images/blue.png";
import greenCandy from "./images/Green.png";
import orangeCandy from "./images/orange.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import BG from "./images/BG.png";
//components
import ScoreBoard from "./components/ScoreBoard";
import Database from "./components/Database";
import LeaderBoard from "./components/LeaderBoard";
//context
import { ScoreContext } from "./Context/ScoreContext";

const width = 8;
const candyColors = [
  redCandy,
  blueCandy,
  purpleCandy,
  orangeCandy,
  greenCandy,
  yellowCandy,
];

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState();
  const [squareBeingReplaced, setSquareBeingReplaced] = useState();
  const [scoreDislpay, setScoreDislpay] = useState(0);

  const [DATA, setDATA] = useState({
    Username: "",
    Score: "",
  });

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const colummnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];

      const isBlank = currentColorArrangement[i] === blank;

      if (
        colummnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDislpay((score) => score + 4);
        colummnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        RowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDislpay((score) => score + 4);
        RowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const colummnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        colummnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDislpay((score) => score + 3);
        colummnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        RowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDislpay((score) => score + 3);
        RowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }
      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    currentColorArrangement,
    checkForRowOfThree,
    checkForColumnOfThree,
  ]);

  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    // console.log(validMove);

    if (validMove) {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");

      const isAColumnOfFour = checkForColumnOfFour();
      const isARowOfFour = checkForRowOfFour();
      const isAColumnOfThree = checkForColumnOfThree();
      const isARowOfThree = checkForRowOfThree();

      if (
        squareBeingReplacedId &&
        (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
      ) {
        setSquareBeingDragged(null);
        setSquareBeingDragged(null);
      } else {
        currentColorArrangement[squareBeingReplacedId] =
          squareBeingReplaced.getAttribute("src");
        currentColorArrangement[squareBeingDraggedId] =
          squareBeingDragged.getAttribute("src");
        setCurrentColorArrangement([...currentColorArrangement]);
      }
    }
  };

  return (
    <ScoreContext.Provider value={{ DATA, setDATA }}>
      <div>
        <img className="imgimg" src={BG} alt="" />
      </div>
      <div className="app">
        <div className="game">
          {currentColorArrangement.map((candyColor, index) => (
            <img
              key={index}
              // style={{ backgroundColor: candyColor }}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </div>
        <div>
          <div className="scoreboard">
            <ScoreBoard score={scoreDislpay} />
            <Database />
          </div>
          <LeaderBoard />
        </div>
      </div>
    </ScoreContext.Provider>
  );
}

export default App;
