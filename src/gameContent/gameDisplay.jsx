import "./gameContentCSS/gameContentROOT.css";
import "./gameContentCSS/headerStyle.css";
import "./gameContentCSS/scoreBoard.css";
import "./gameContentCSS/mainContent.css";
import "./gameContentCSS/card.css";

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

function ScoreBoard() {
  return (
    <div className="scoreBoardContainer">
      <div className="scoreBoardHeader">
        <div>
          <h4>Score: 2</h4>
        </div>
        <div>
          <h4>Best Score: 8</h4>
        </div>
      </div>
      <div className="currentScoreTrackerContainer">
        <div className="currentScoreTrackerWrapper">
          <h3>2 / 9</h3>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="cardContainer">
      <div className="cardWrapper">
        <div className="cardHeader">
          <h5>pokemon name</h5>
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

function GameBoard() {
  return (
    <div>
      <Card />
    </div>
  );
}

function MainContent() {
  return (
    <div className="mainContentClass">
      <ScoreBoard />
      <GameBoard />
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
