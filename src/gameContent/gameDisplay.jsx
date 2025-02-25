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
  icon,
  pokemonPicture,
  imgAlt,
  index,
}) {
  return (
    <div
      className="cardContainer"
      id={id}
      onClick={onClick}
      style={{ order: `${index} !important` }}
    >
      <div className="cardWrapper" id={id}>
        <div className="cardHeader" id={id}>
          <h5 id={id}>{pokemonName}</h5>
          <h5 id={id}>{icon}</h5>
        </div>
        <div className="cardImgContainer" id={id}>
          <div className="cardImgWrapper" id={id}>
            <img src={pokemonPicture} alt={imgAlt} id={id} />
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

  const [repos, setRepos] = useState([]);

  const url = "https://pokeapi.co/api/v2/pokemon/";

  const fetchData = async () => {
    fetch(url)
      .then((response) => response.json())
      .then(function (allpokemon) {
        allpokemon.results.forEach(function (pokemon) {
          fetchPokemonData(pokemon);
        });
      });
  };

  const pokemons = [];

  const fetchPokemonData = (pokemon) => {
    if (!pokemons.includes(pokemon.name)) {
      pokemons.push(pokemon.name);
      let url = pokemon.url;

      fetch(url)
        .then((response) => response.json())
        .then(function (pokeData) {
          setRepos((prevRepos) => [
            ...prevRepos,
            {
              name: pokeData.name,
              imageData: `https://img.pokemondb.net/artwork/${pokeData.name}.jpg`,
              type: pokeData.types[0].type.name,
              id: pokeData.id,
              typeIconUrl: "",
            },
          ]);
        });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [cardOrder, setCardOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const changeCardOrder = () => {
    setCardOrder([]);
    let tempArray = [];

    while (tempArray.length < 10) {
      let nr = Math.floor(Math.random() * 10);
      if (!tempArray.includes(nr)) {
        tempArray.push(nr);
      }
    }
    setCardOrder(tempArray);
  };

  return (
    <div className="mainContentClass">
      <ScoreBoard
        currScore={score}
        maxScore={someArray.length}
        bestScore={bestScore}
      />
      <div className="cardBoardContainer">
        {repos.length > someArray.length
          ? cardOrder.map((el) => (
              <Card
                pokemonName={repos[el].name}
                icon={repos[el].type}
                key={el}
                id={el}
                onClick={(e) => {
                  cardClicked(e);
                  changeCardOrder();
                }}
                pokemonPicture={repos[el].imageData}
                index={el}
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
