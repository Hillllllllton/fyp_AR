import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSkullControls } from "./modelControls";

const SkullModel = ({ matrix, faceWidth, faceHeight, isResizing }) => {
  const { scene, materials } = useGLTF("nospaceright.glb");
  const { scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ, opacity } =
    useSkullControls();
  const modelRef = useRef();
  const initialX = 13.5;
  const initialY = 13.5;
  const initialZ = 13.5;

  useEffect(() => {
    if (matrix) {
      // let baseScaleX = faceWidth ? faceWidth / 28 : initialX;
      // let baseScaleY = faceHeight ? faceHeight / 40 : initialY;
      // console.log("innerWidth", window.innerWidth);
      // console.log("innerHeight", window.innerHeight);

      let baseScaleZ = initialZ;
      let saclefactorX = ((-750 / matrix.elements[14]) * 1280) / 1280;
      let saclefactorY = ((-750 / 0.7 / matrix.elements[14]) * 720) / 720;
      let baseScaleX = faceWidth ? faceWidth / saclefactorX : initialX;
      let baseScaleY = faceHeight ? faceHeight / saclefactorY : initialY;
      // console.log("faceWidth", faceWidth);
      // console.log("faceHeight", faceHeight);

      // Apply manual scaling on top of the base scale
      const finalScaleX = baseScaleX * scaleX;
      const finalScaleY = baseScaleY * scaleY;
      const finalScaleZ = baseScaleZ * scaleZ;
      // console.log("finalScaleX", finalScaleX);
      // console.log("finalScaleY", finalScaleY);
      const m = matrix
        .clone()
        .scale(new THREE.Vector3(finalScaleX, finalScaleY, finalScaleZ));
      m.setPosition(
        m.elements[12] + offsetX,
        m.elements[13] + offsetY,
        m.elements[14] + offsetZ,
      );
      // console.log("element X", m.elements[12]);
      // console.log("element Y", m.elements[13]);
      // console.log("element Z", m.elements[14]);
      scene.matrixAutoUpdate = false;
      scene.matrix.copy(m);
      // console log current scale
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
