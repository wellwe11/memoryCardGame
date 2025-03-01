import pokemonBallImg from "./gameContentImages/pokemonBallLoadingImage.png";
import "./gameContentCSS/mainContent.css";

export default function LoadingSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 330"
      className="SVGLoading"
    >
      <image
        href={pokemonBallImg}
        x="0"
        y="0"
        width="80"
        height="80"
        rx="0"
        ry="0"
      >
        <animate
          attributeName="rx"
          calcMode="spline"
          dur="2s"
          values="80;80;30;80;80"
          keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="ry"
          calcMode="spline"
          dur="2s"
          values="80;80;40;80;80"
          keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          calcMode="spline"
          dur="2s"
          values="160;160;20;160;160"
          keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          calcMode="spline"
          dur="2s"
          values="50;200;50"
          keySplines=".6 0 1 .4;0 .8 .2 1"
          repeatCount="indefinite"
        />
      </image>
    </svg>
  );
}
