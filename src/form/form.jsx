import "./formCSS/form.css";
import { useState, useEffect } from "react";

export default function Form({ hideMenuFn }) {
  useEffect(() => {
    const fetchGiphy = async () => {
      const fetchedGiphy = fetch(
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHByOWF4enFma2IzeW5iNWVmenFzaDFtemlrbHltOHp6dzdiOHYwciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6vEi7p81nYYcU/giphy.gif"
      ).then((reposne) => reposne.json());

      const giphy = await promise(fetchedGiphy);
    };
  });

  return (
    <div
      className="entryContainer"
      style={{
        display: "",
      }}
    >
      <div
        className="giphyImage"
        style={{
          backgroundImage: "",
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
            <button onClick={hideMenuFn}>Start game</button>
            <button>Collections</button>
            <button>Credits</button>
          </div>
        </div>
      </div>
    </div>
  );
}
