import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSkullControls } from "./modelControls";

const SkullModel = ({ matrix }) => {
  const gltf = useGLTF("nospaceright.glb");
  const { scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ } =
    useSkullControls();
  const modelRef = useRef();

  useEffect(() => {
    if (matrix) {
      const m = matrix.clone().scale(new THREE.Vector3(scaleX, scaleY, scaleZ));
      m.setPosition(
        m.elements[12] + offsetX,
        m.elements[13] + offsetY,
        m.elements[14] + offsetZ,
      );
      gltf.scene.matrixAutoUpdate = false;
      gltf.scene.matrix.copy(m);
    }
  }, [matrix, scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ]);

  return <primitive object={gltf.scene} ref={modelRef} />;
};
export default SkullModel;
