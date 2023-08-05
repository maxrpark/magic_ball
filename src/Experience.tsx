import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import MagicBall from "./components/MagicBall";
import { Suspense, useRef, useState } from "react";
import LabelText from "./components/LabelText";
import { magicBallPhrases } from "./utils";

interface Props {
  selectedColor: string;
}

const Experience: React.FC<Props> = ({ selectedColor }) => {
  const [phrase, setPhrase] = useState("Ask a question");

  const directionalLight = useRef(null!);
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const getNewPhrase = () => {
    const randomIndex = Math.floor(Math.random() * magicBallPhrases.length);
    setPhrase(magicBallPhrases[randomIndex]);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={1.5}
        castShadow
        position={[7, 10, 10]}
        shadow-mapSize={[1024, 1024]}
      />

      <pointLight color={"purple"} intensity={10} position={[0, -0.2, -0.5]} />
      <pointLight color={"yellow"} intensity={1} position={[0, 0.2, 0.5]} />
      <Suspense
        fallback={
          <LabelText positionY={0} fontSize={0.5} text={"Loading..."} />
        }
      >
        <MagicBall
          getNewPhrase={getNewPhrase}
          selectedColor={selectedColor}
          phrase={phrase}
        />
        <LabelText
          positionY={-1.35}
          fontSize={0.2}
          text={" Scroll up and down while asking your question"}
        />
      </Suspense>
    </>
  );
};

export default Experience;
