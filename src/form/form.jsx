import GameContent from "../gameContent/gameDisplay";

import { useState } from "react";
import "./formCSS/form.css";

export default function GameStart() {
  const [difficulty, setDifficulty] = useState();
  const [viewDifficulty, setViewDifficulty] = useState(false);

  const showDifficultyMenu = () => {
    setViewDifficulty(true);
  };

  const hideDifficultyMenu = () => {
    setViewDifficulty(false);
  };

  const getDifficulty = (e) => {
    setDifficulty(e.target.textContent);
  };

  const [hideMenu, setHideMenu] = useState(false);

  const hideMenuFn = () => {
    setHideMenu(true);
  };

  const pikachuGif =
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHByOWF4enFma2IzeW5iNWVmenFzaDFtemlrbHltOHp6dzdiOHYwciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6vEi7p81nYYcU/giphy.gif";

  return (
    <>
      {hideMenu ? (
        <div className="headerContainer">
          <GameContent difficulty={difficulty} />
        </div>
      ) : (
        <div
          className="entryContainer"
          style={{
            display: "",
          }}
        >
          <div
            className="giphyImage"
            style={{
              backgroundImage: `url(${pikachuGif})`,
            }}
          ></div>
          <div>
            <div className="entryMenu">
              <div className="menuTitle">
                <h1>
                  <div>Pokemon</div>
                  <div>Memory Card</div>
                </h1>
              </div>
              <div className="MenuButtonsContainer">
                {!viewDifficulty ? (
                  <>
                    <button onClick={hideMenuFn}>Start game</button>
                    <button onClick={showDifficultyMenu}>Difficulty</button>
                  </>
                ) : (
                  <div
                    onClick={(e) => {
                      hideDifficultyMenu();
                      getDifficulty(e);
                    }}
                  >
                    <button>Easy</button>
                    <button>Medium</button>
                    <button>Hard</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
