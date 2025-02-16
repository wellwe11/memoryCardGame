import "./menuCSS/menuROOT.css";

export default function Menu() {
  return (
    <div className="containerWidth">
      <div className="flexCenterColumn">
        <h1>Pokémon.</h1>
        <h2>Memory Card</h2>
      </div>
      <div>
        <div className="flexCenterColumn innerWidth">
          <button className="buttonStyle">
            <p>Start Game</p>
          </button>
          <button className="buttonStyle">
            <p>Collections</p>
          </button>
          <button className="buttonStyle">
            <p>Credits</p>
          </button>
          <button className="buttonStyle">
            <p>Reset</p>
          </button>
        </div>
      </div>
    </div>
  );
}
