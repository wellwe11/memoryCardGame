import "./gameContentCSS/gameContentROOT.css";
import "./gameContentCSS/headerStyle.css";
import "./gameContentCSS/scoreBoard.css";
import "./gameContentCSS/mainContent.css";
import "./gameContentCSS/card.css";

import { useState, useEffect } from "react";

function HeaderContent() {
  return (
    <header className="headerContent">
      <div className="headerSections">
        <button>Return to menu</button>
        <button>Reset</button>
      </div>
      <div className="headerSections">
        <h1>
          <div>Pokémon </div>
          <div>Memory Card</div>
        </h1>
      </div>
      <div className="headerSections">
        <button>Help?</button>
      </div>
    </header>
  );
}

function ScoreBoard({ currScore, maxScore, bestScore }) {
  return (
    <div className="scoreBoardContainer">
      <div className="scoreBoardHeader">
        <div>
          <h4>Score: {currScore}</h4>
        </div>
        <div>
          <h4>Best Score: {bestScore}</h4>
        </div>
      </div>
      <div className="currentScoreTrackerContainer">
        <div className="currentScoreTrackerWrapper">
          <h3>
            {currScore} / {maxScore}
          </h3>
        </div>
      </div>
    </div>
  );
}

function Card({ pokemonName, id, onClick }) {
  return (
    <div className="cardContainer" id={id} onClick={onClick}>
      <div className="cardWrapper">
        <div className="cardHeader">
          <h5>{pokemonName}</h5>
          <h5>icon</h5>
        </div>
        <div className="cardImgContainer">
          <div className="cardImgWrapper">
            <h1>placeholder</h1>
            <img />
          </div>
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedNumbers, setClickedNumbers] = useState([]);
  const [clickedNumber, setClickedNumber] = useState();

  useEffect(() => {
    if (score > bestScore) {
      setBestScore((prevBestScore) => prevBestScore + 1);
    }
  }, [score, bestScore]);

  const cardClicked = (e) => {
    if (e.target === e.currentTarget) {
      setClickedNumber(Number(e.target.id));
      if (!clickedNumbers.includes(e.target.id)) {
        setClickedNumbers((prev) => [...prev, Number(e.target.id)]);
        console.log(clickedNumbers);
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  useEffect(() => {
    if (clickedNumbers.includes(clickedNumber)) {
      setScore(0);
      setClickedNumber(null);
      setClickedNumbers([]);
    }
  }, [clickedNumbers, clickedNumber, score]);

  console.log(
    "score:",
    score,
    "clicked number:",
    clickedNumber,
    "array:",
    clickedNumbers
  );

  return (
    <div className="mainContentClass">
      <ScoreBoard
        currScore={score}
        maxScore={someArray.length}
        bestScore={bestScore}
      />
      <div className="cardBoardContainer">
        {someArray.map((el) => (
          <Card pokemonName={el} key={el} id={el} onClick={cardClicked} />
        ))}
      </div>
    </div>
  );
}

function FooterContent() {
  return (
    <footer>
      <div></div>
      <div></div>
    </footer>
  );
}

export default function GameContent() {
  return (
    <div>
      <HeaderContent />
      <MainContent />
      <FooterContent />
    </div>
  );
}
