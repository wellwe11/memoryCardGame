import "./gameContentCSS/gameContentROOT.css";
import "./gameContentCSS/headerStyle.css";
import "./gameContentCSS/scoreBoard.css";
import "./gameContentCSS/mainContent.css";
import "./gameContentCSS/card.css";

import BacksideCard from "./gameContentImages/pokemonCardBackside.jpg";
import LoadingSVG from "./loadingSVG";

import fireCard from "./gameContentImages/fireCard.png";
import waterCard from "./gameContentImages/waterCard.png";
import electricityCard from "./gameContentImages/electricityCard.png";
import grassCard from "./gameContentImages/grassCard.png";
import psychicCard from "./gameContentImages/psychicCard.png";
import normalCard from "./gameContentImages/normalCard.png";
import steelCard from "./gameContentImages/steelCard.png";
import fightingCard from "./gameContentImages/fightingCard.png";

import pokemonBackgroundImage from "./gameContentImages/pokemonBackgroundImage.jpg";
import mainBackgroundImage from "./gameContentImages/backgroundWallpaper.webp";
import scoreBoardCloud from "./gameContentImages/cloudTwo.webp";

import { useState, useEffect } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function HeaderContent({ onClickMenu, onClickReset }) {
  return (
    <header className="headerContent">
      <div className="headerMenuBtnContainer">
        <button className="headerMenuBtn" onClick={onClickMenu}>
          Menu
        </button>
        <button className="headerMenuBtn" onClick={onClickReset}>
          Reset
        </button>
      </div>
      <div className="headerSections">
        <h1>
          <div>Pokémon </div>
          <div>Memory Card</div>
        </h1>
      </div>
      <div></div>
    </header>
  );
}

function ScoreBoard({ currScore, maxScore, bestScore }) {
  return (
    <div
      className="scoreBoardContainer"
      style={{
        backgroundImage: `url(${scoreBoardCloud})`,
        backgroundSize: "100% 100%",
      }}
    >
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
  // a common state to trigger cards transform
  const [flipCard, setFlipCard] = useState(false);

  useEffect(() => {
    let nr = Math.floor(Math.random() * 5) + 1;
    if (cardState) {
      setTimeout(() => {
        setFlipCard(true);
      }, `${4}${nr}${0}`);
    } else {
      // flips them with a small amount of delay from each other
      setTimeout(() => {
        setFlipCard(false);
      }, `${nr}${0}`);
    }
  }, [cardState]);

  // framer-motion code
  // -------------------------- vv -------------------------- //

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.7, 0.7],
    ["7.5deg", "-7.5deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.7, 0.7],
    ["-7.5deg", "7.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // store image-data in object to make backgroundImage access them cleaner
  const pokemonTypeImages = {
    fire: fireCard,
    water: waterCard,
    electric: electricityCard,
    grass: grassCard,
    psychic: psychicCard,
    normal: normalCard,
    steel: steelCard,
    fighting: fightingCard,
    poison: psychicCard,
    rock: fightingCard,
    bug: grassCard,
    fairy: normalCard,
    ground: fightingCard,
    ghost: psychicCard,
  };

  return (
    <div
      className={`${
        flipCard ? "frontAndBackCardContainer" : "frontAndBackSwitch"
      }`}
      id={id}
    >
      <motion.div
        className={`cardContainer`}
        id={id}
        onClick={onClick}
        style={{
          order: `${index}`,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundImage: `url(${pokemonTypeImages[typeOne]})`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cardWrapper" id={id}>
          <div className="cardHeader" id={id}>
            <div>
              <h5 id={id}>{pokemonName}</h5>
            </div>
          </div>
          <div
            className="cardImgContainer"
            id={id}
            style={{
              backgroundImage: `url(${pokemonBackgroundImage})`,
              backgroundSize: "100% 100%",
            }}
          >
            <div className="cardImgWrapper" id={id}>
              <img src={pokemonPicture} alt={imgAlt} id={id} />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="cardContainerTwo">
        <img src={BacksideCard} alt="pokemoncard backside" />
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

export default function MainContent({ difficulty, displayFormFn }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // each card has a unique ID which it keeps throughout the game. They are added to an array to check if they are clicked again
  const [clickedNumbers, setClickedNumbers] = useState([]);

  // state that will load the cards once everything has been fetched
  const [fetchedData, setFetchedData] = useState(false);

  // initial card-order
  const [cardOrder, setCardOrder] = useState(
    difficulty === "Easy"
      ? [0, 1, 2, 3]
      : difficulty === "Medium"
      ? [0, 1, 2, 3, 4, 5, 6, 7]
      : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  );

  const [pokemonId, setPokemonId] = useState([]);

  // pokemon data
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setPokemonIds();
  }, [difficulty]);

  const setPokemonIds = () => {
    setPokemonId([]);
    const tempArr = [];
    const difficultyLength =
      difficulty === "Easy" ? 4 : difficulty === "Medium" ? 8 : 12;
    while (tempArr.length < difficultyLength) {
      const randomNum = Math.floor(Math.random() * 98) + 1;
      if (!tempArr.includes(randomNum)) {
        tempArr.push(randomNum);
      }
    }

    setPokemonId(tempArr);
  };

  const cardClicked = (e) => {
    if (!clickedNumbers.includes(Number(e.target.id))) {
      setClickedNumbers((prev) => [...prev, Number(e.target.id)]);
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore(0);
      setClickedNumbers([]);
    }
  };

  // update highscore whenever we reach a new highscore
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  useEffect(() => {
    // fetch from pokeAPI
    const fetchData = async () => {
      const data = fetch(`https://pokeapi.co/api/v2/pokemon?limit=99`).then(
        (reponse) => reponse.json()
      );

      const pokemons = await data;

      const fetchedPokemons = pokemonId.map((n) => {
        return fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemons.results[n].name}`
        ).then((reponse) => reponse.json());
      });

      const pokemonData = await Promise.all(fetchedPokemons);

      // create my own object with information I explicitly need
      const newPokemons = pokemonData.map((pokemon) => ({
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        imageData: `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`,
        typeOne: pokemon.types[0].type.name,
        id: pokemon.id,
      }));

      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    };

    fetchData();

    // a timer to make sure all data is fetched before anything loads
    const timer = setTimeout(() => {
      setFetchedData(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pokemonId]);

  // remakes the card order to random order
  const changeCardOrder = () => {
    // added delay to match the cards turnaround (so they dont render new positions before the cards have flipped)
    setTimeout(() => {
      setCardOrder([]);

      // using a temporary array because I couldnt make it work effective with cardOrder on each new number.
      // Essentially, we save renders (I think) if we use a local array, then push the entire thing to our state array (cardOrder)
      let tempArray = [];

      while (tempArray.length < cardOrder.length) {
        let nr = Math.floor(Math.random() * cardOrder.length - 1) + 1;

        if (!tempArray.includes(nr)) {
          tempArray.push(nr);
        }
      }

      setCardOrder(tempArray);
    }, 550);
  };

  // state that will trigger the transition for the cards to turn
  const [cardState, setCardState] = useState(true);

  const cardChange = () => {
    // with delays to help match each others speeds and make the transform smoother
    setTimeout(() => {
      setCardState(false);
    }, 120);
    setTimeout(() => {
      setCardState(true);
    }, 1000);
  };

  const setHeaderReset = () => {
    setFetchedData(false);
    setPokemons([]);
    setCardOrder([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setPokemonIds();
    setClickedNumbers([]);
    cardChange();
    setScore(0);
    setBestScore(0);
  };

  return (
    <div>
      <HeaderContent
        onClickReset={setHeaderReset}
        onClickMenu={displayFormFn}
      />
      <div
        className="mainContentClass"
        style={{ backgroundImage: `url(${mainBackgroundImage})` }}
      >
        <ScoreBoard
          currScore={score}
          maxScore={cardOrder.length}
          bestScore={bestScore}
        />
        <div
          className="cardBoardContainer"
          style={{
            alignContent: fetchedData ? "flex-start" : "center",
            maxWidth:
              difficulty === "Easy" || difficulty === "Medium"
                ? "800px"
                : "1100px",
          }}
        >
          {fetchedData ? (
            cardOrder.map((el) => (
              <Card
                pokemonName={pokemons[el].name}
                typeOne={pokemons[el].typeOne}
                key={`${el}`}
                id={el}
                onClick={(e) => {
                  cardChange();
                  cardClicked(e);
                  changeCardOrder();
                }}
                pokemonPicture={pokemons[el].imageData}
                index={el}
                cardState={cardState}
                imgAlt={`${pokemons[el].name} pokemon card`}
              />
            ))
          ) : (
            <div className="loadingImage">
              <div>
                <LoadingSVG />
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterContent />
    </div>
  );
}
