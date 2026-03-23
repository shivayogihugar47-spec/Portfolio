import React, { useRef } from "react";
import { useGLTF, Center } from "@react-three/drei";

export default function Model(props) {
  const { scene } = useGLTF("/model.glb");
  const modelRef = useRef();

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={scene}
        {...props}
      />
    </Center>
  );
}

useGLTF.preload("/model.glb");