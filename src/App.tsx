import { Canvas } from "@react-three/fiber";
import ColorPicker from "./components/ColorPicker";
import { useState } from "react";
import { colors } from "./utils";
import Experience from "./Experience";
import { Stats } from "@react-three/drei";

const userColor = localStorage.getItem("ball_color") || colors[0];

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(userColor);

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    localStorage.setItem("ball_color", color);
  };

  return (
    <>
      <Canvas>
        <Experience selectedColor={selectedColor} />
        <Stats />
      </Canvas>

      <ColorPicker
        selectedColor={selectedColor}
        colors={colors}
        handleSelectColor={handleSelectColor}
      />
    </>
  );
};

export default App;
