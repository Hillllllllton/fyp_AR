import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSkullControls } from "./modelControls";

const SkullModel = ({ matrix, faceWidth, faceHeight }) => {
  const { scene, materials } = useGLTF("nospaceright.glb");
  const { scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ, opacity } =
    useSkullControls();
  const modelRef = useRef();
  const initialX = 18,
    initialY = 18,
    initialZ = 18;

  useEffect(() => {
    if (matrix) {
      let baseScaleX = faceWidth ? faceWidth / 100 : initialX;
      let baseScaleY = faceHeight ? faceHeight / 5 : initialY;
      let baseScaleZ = initialZ;

      // Apply manual scaling on top of the base scale
      const finalScaleX = baseScaleX * scaleX;
      const finalScaleY = baseScaleY * scaleY;
      const finalScaleZ = baseScaleZ * scaleZ;
      const m = matrix
        .clone()
        .scale(new THREE.Vector3(finalScaleX, finalScaleY, finalScaleZ));
      m.setPosition(
        m.elements[12] + offsetX,
        m.elements[13] + offsetY,
        m.elements[14] + offsetZ,
      );
      scene.matrixAutoUpdate = false;
      scene.matrix.copy(m);
    }
  }, [matrix, scaleX, scaleY, scaleZ, offsetX, offsetY, faceWidth, faceHeight]);

  useEffect(() => {
    if (materials) {
      for (const materialName in materials) {
        const material = materials[materialName];
        material.opacity = opacity;
        material.transparent = opacity < 1;
        material.needsUpdate = true;
      }
    }
  }, [materials, opacity]);

  return <primitive object={scene} ref={modelRef} />;
};

export default SkullModel;
