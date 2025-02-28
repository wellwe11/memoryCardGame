import "./gameContentCSS/gameContentROOT.css";
import "./gameContentCSS/headerStyle.css";
import "./gameContentCSS/scoreBoard.css";
import "./gameContentCSS/mainContent.css";
import "./gameContentCSS/card.css";

import BacksideCard from "./gameContentImages/pokemonCardBackside.jpg";
import LoadingSVG from "./loadingSVG";

import { useState, useEffect } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  // a common state to trigger cards transform
  const [flipCard, setFlipCard] = useState(false);

  useEffect(() => {
    let nr = Math.floor(Math.random() * 5) + 1;
    if (cardState) {
      setFlipCard(true);
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

  return (
    <div
      className={`${
        flipCard ? "frontAndBackCardContainer" : "frontAndBackSwitch"
      }`}
      id={id}
      style={{}}
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
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
      </motion.div>

      <div className="cardContainerTwo">
        <img src={BacksideCard} alt="pokemoncard backside" />
      </div>
    </div>
  );
}

function MainContent() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // each card has a unique ID which it keeps throughout the game. They are added to an array to check if they are clicked again
  const [clickedNumbers, setClickedNumbers] = useState([]);

  // state that will load the cards once everything has been fetched
  const [fetchedData, setFetchedData] = useState(false);

  // initial card-order
  const [cardOrder, setCardOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // pokemon data
  const [pokemons, setPokemons] = useState([]);

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
      const promises = cardOrder.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((reponse) =>
          reponse.json()
        )
      );

      const pokemons = await Promise.all(promises);

      // create my own object with information I explicitly need
      const newPokemons = pokemons.map((pokemon) => ({
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        imageData: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
        typeOne:
          pokemon.types[0].type.name.charAt(0).toUpperCase() +
          pokemon.types[0].type.name.slice(1),
        id: pokemon.id,
      }));

      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    };

    fetchData();

    // a timer to make sure all data is fetched before anything loads
    const timer = setTimeout(() => {
      setFetchedData(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // remakes the card order to random order
  const changeCardOrder = () => {
    // added delay to match the cards turnaround (so they dont render new positions before the cards have flipped)
    setTimeout(() => {
      setCardOrder([]);

      // using a temporary array because I couldnt make it work effective with cardOrder on each new number.
      // Essentially, we save renders (I think) if we use a local array, then push the entire thing to our state array (cardOrder)
      let tempArray = [];

      while (tempArray.length < 9) {
        let nr = Math.floor(Math.random() * 9) + 1;

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

  return (
    <div className="mainContentClass">
      <ScoreBoard
        currScore={score}
        maxScore={cardOrder.length}
        bestScore={bestScore}
      />
      <div className="cardBoardContainer">
        {fetchedData ? (
          cardOrder.map((el) => (
            <Card
              pokemonName={pokemons[el].name}
              typeOne={pokemons[el].typeOne}
              key={`${el}`}
              id={el}
              onClick={(e) => {
                cardClicked(e);
                changeCardOrder();
                cardChange();
              }}
              pokemonPicture={pokemons[el].imageData}
              index={el}
              cardState={cardState}
              imgAlt={`${pokemons[el].name} pokemon card`}
            />
          ))
        ) : (
          <div className="loadingImage">
            <LoadingSVG />
          </div>
        )}
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
