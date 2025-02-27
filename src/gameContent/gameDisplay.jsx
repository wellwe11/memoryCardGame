import "./gameContentCSS/gameContentROOT.css";
import "./gameContentCSS/headerStyle.css";
import "./gameContentCSS/scoreBoard.css";
import "./gameContentCSS/mainContent.css";
import "./gameContentCSS/card.css";

import BacksideCard from "./gameContentImages/pokemonCardBackside.jpg";

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
          <h4>
            {bestScore < maxScore
              ? `Best score: ${bestScore}`
              : "You have won!"}
          </h4>
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

function Card({
  pokemonName,
  id,
  onClick,
  typeOne,
  pokemonPicture,
  imgAlt,
  index,
  cardState,
}) {
  return (
    <div
      className={`${
        cardState ? "frontAndBackCardContainer" : "frontAndBackSwitch"
      }`}
    >
      <div
        className={`cardContainer`}
        id={id}
        onClick={onClick}
        style={{ order: `${index} !important` }}
      >
        <div className="cardWrapper" id={id}>
          <div className="cardHeader" id={id}>
            <div>
              <h5 id={id}>{pokemonName}</h5>
            </div>
            <div>
              <h5>{typeOne}</h5>
            </div>
          </div>
          <div className="cardImgContainer" id={id}>
            <div className="cardImgWrapper" id={id}>
              <img src={pokemonPicture} alt={imgAlt} id={id} />
            </div>
          </div>
        </div>
      </div>

      <div className="cardContainerTwo">
        <img src={BacksideCard} alt="" />
      </div>
    </div>
  );
}

function MainContent() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedNumbers, setClickedNumbers] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [cardOrder, setCardOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [repos, setRepos] = useState([]);

  const cardClicked = (e) => {
    if (!clickedNumbers.includes(Number(e.target.id))) {
      setClickedNumbers((prev) => [...prev, Number(e.target.id)]);
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore(0);
      setClickedNumbers([]);
    }
  };

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = cardOrder.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((reponse) =>
          reponse.json()
        )
      );

      const pokemons = await Promise.all(promises);

      const newRepos = pokemons.map((pokemon) => ({
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        imageData: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
        typeOne:
          pokemon.types[0].type.name.charAt(0).toUpperCase() +
          pokemon.types[0].type.name.slice(1),
        id: pokemon.id,
      }));

      console.log(pokemons);

      setRepos((prevRepos) => [...prevRepos, ...newRepos]);
    };

    fetchData();

    const timer = setTimeout(() => {
      setFetchedData(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const changeCardOrder = () => {
    setCardOrder([]);
    let tempArray = [];

    while (tempArray.length < 9) {
      let nr = Math.floor(Math.random() * 9) + 1;

      if (!tempArray.includes(nr)) {
        tempArray.push(nr);
      }
    }

    setCardOrder(tempArray);
  };

  const [cardState, setCardState] = useState(true);

  const cardChange = () => {
    setCardState(false);
    setTimeout(() => {
      setCardState(true);
    }, 1000);
  };

  return (
    <div className="mainContentClass">
      <ScoreBoard
        currScore={score}
        maxScore={cardOrder.length}
        bestScore={bestScore}
      />
      <div className="cardBoardContainer">
        {fetchedData
          ? cardOrder.map((el) => (
              <Card
                pokemonName={repos[el].name}
                typeOne={repos[el].typeOne}
                key={el}
                id={el}
                onClick={(e) => {
                  cardClicked(e);
                  changeCardOrder();
                  cardChange();
                }}
                pokemonPicture={repos[el].imageData}
                index={el}
                cardState={cardState}
              />
            ))
          : ""}
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
