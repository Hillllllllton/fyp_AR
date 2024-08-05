// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { useSkullControls } from "./modelControls";
//
// const SkullModel = ({ matrix }) => {
//   const { scene, materials } = useGLTF("nospaceright.glb");
//   const { scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ, opacity } =
//     useSkullControls();
//   const modelRef = useRef();
//
//   useEffect(() => {
//     if (matrix) {
//       const m = matrix.clone().scale(new THREE.Vector3(scaleX, scaleY, scaleZ));
//       m.setPosition(
//         m.elements[12] + offsetX,
//         m.elements[13] + offsetY,
//         m.elements[14] + offsetZ,
//       );
//       scene.matrixAutoUpdate = false;
//       scene.matrix.copy(m);
//     }
//   }, [matrix, scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ]);
//
//   useEffect(() => {
//     if (materials) {
//       for (const materialName in materials) {
//         const material = materials[materialName];
//         material.opacity = opacity;
//         material.transparent = opacity < 1;
//         material.needsUpdate = true;
//       }
//     }
//   }, [materials, opacity]);
//
//   return <primitive object={scene} ref={modelRef} />;
// };
//
// export default SkullModel;

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSkullControls } from "./modelControls";

const SkullModel = ({ matrix, faceWidth, faceHeight }) => {
  const { scene, materials } = useGLTF("nospaceright.glb");
  const { scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ, opacity } =
    useSkullControls();
  const modelRef = useRef();

  useEffect(() => {
    if (matrix) {
      // Calculate scale based on faceWidth and faceHeight
      const calculatedScaleX = faceWidth ? faceWidth / 28 : scaleX;
      const calculatedScaleY = faceHeight ? faceHeight / 38 : scaleY;
      const m = matrix
        .clone()
        .scale(new THREE.Vector3(calculatedScaleX, calculatedScaleY, scaleZ));
      m.setPosition(
        m.elements[12] + offsetX,
        m.elements[13] + offsetY,
        m.elements[14] + offsetZ,
      );
      scene.matrixAutoUpdate = false;
      scene.matrix.copy(m);
      // console log current scale
      console.log("scaleX: ", scene, "scaleY: ", scene.height);
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
