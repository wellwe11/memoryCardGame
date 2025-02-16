import "./menuCSS/menuROOT.css";

export default function Menu() {
  return (
    <div className="flexCenterColumn">
      <div className="flexCenterColumn">
        <h1>Pokémon.</h1>
        <h2>Memory Card</h2>
      </div>
      <div className="flexCenterRow">
        <div className="flexCenterColumn">
          <button>
            <p>Start Game</p>
          </button>
          <button>
            <p>Collections</p>
          </button>
          <button>
            <p>Credits</p>
          </button>
          <button>
            <p>Reset</p>
          </button>
        </div>
      </div>
    </div>
  );
}
