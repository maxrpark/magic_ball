import React, { useRef } from "react";
import { useGLTF, Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(Observer);

type GLTFResult = GLTF & {
  nodes: {
    ball: THREE.Mesh;
    circle: THREE.Mesh;
  };
  materials: {
    ball: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
  };
};

interface Props {
  selectedColor: string;
  phrase: string;
  getNewPhrase: () => void;
}

const MagicBall: React.FC<Props> = ({
  selectedColor,
  phrase,
  getNewPhrase,
}) => {
  const { nodes, materials } = useGLTF("/magic_ball.glb") as GLTFResult;
  const ballRef = useRef<THREE.Group>(null!);
  const messageRef = useRef<THREE.Group>(null!);

  Observer.create({
    target: "canvas",
    type: "wheel,touch",

    onChangeY: (self) => {
      if (ballRef.current) {
        ballRef.current.rotation.x = self.deltaY * 0.01;
        messageRef.current.rotation.y = self.deltaY * 0.1;
        messageRef.current.rotation.x = self.deltaY * 0.1;
        const tl = gsap.timeline({ ease: "none" });
        tl.to(messageRef.current.scale, {
          x: 0.9,
          y: 0.9,
          z: 0.9,
        }).to(
          materials.Material,
          {
            opacity: 0.95,
          },
          "-=.3"
        );
      }
    },

    onStop: () => {
      if (ballRef.current && ballRef.current.rotation.x !== 0) {
        const tl = gsap.timeline({ ease: "none" });
        tl.to(ballRef.current.rotation, { x: 0, onStart: () => getNewPhrase() })
          .to(
            materials.Material,
            {
              opacity: 0.3,
            },
            "<"
          )
          .to(
            messageRef.current.scale,
            {
              x: 1,
              y: 1,
              z: 1,
            },
            "-=.4"
          )
          .to(messageRef.current.rotation, { y: 0, x: 0 }, "<");
      }
    },
  });

  return (
    <Float position-y={0.7} rotation-x={0.1} speed={3}>
      <group ref={ballRef} scale={1.5} dispose={null}>
        <mesh
          geometry={nodes.ball.geometry}
          material={materials.ball}
          material-color={selectedColor}
        />
        <mesh
          geometry={nodes.circle.geometry}
          material={materials.Material}
          material-transparent={true}
          material-opacity={0.3}
          material-color={"black"}
        />
        <Float floatIntensity={0.5} speed={4}>
          <group ref={messageRef} position-z={0.4} position-y={0.04}>
            <mesh receiveShadow rotation-x={-1}>
              <dodecahedronGeometry args={[0.42]} />
              <meshStandardMaterial
                roughness={0.5}
                metalness={1.8}
                color={"red"}
              />
            </mesh>

            <Text
              position-z={0.34}
              fontSize={0.1}
              color='yellow'
              textAlign='center'
              maxWidth={0.4}
            >
              {phrase}
            </Text>
          </group>
        </Float>
      </group>
    </Float>
  );
};

useGLTF.preload("/magic_ball.glb");

export default MagicBall;
