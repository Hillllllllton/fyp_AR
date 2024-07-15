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
import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSkullControls } from "./modelControls";

const SkullModel = ({ matrix, faceLandmark }) => {
  const { scene, materials } = useGLTF("nospaceright.glb");
  const { offsetX, offsetY, offsetZ, opacity } = useSkullControls();
  const modelRef = useRef();
  const [scaled, setScaled] = useState(false);

  useEffect(() => {
    if (matrix) {
      const m = matrix.clone();
      m.setPosition(
        m.elements[12] + offsetX,
        m.elements[13] + offsetY,
        m.elements[14] + offsetZ,
      );
      scene.matrixAutoUpdate = false;
      scene.matrix.copy(m);
    }
  }, [matrix, offsetX, offsetY, offsetZ]);

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

  useEffect(() => {
    const adjustScaleToFitBoundaries = () => {
      if (matrix && faceLandmark && !scaled) {
        const upperBoundary = faceLandmark[10].y * -6 + 3;
        const lowerBoundary = faceLandmark[152].y * -6 + 3;
        const leftBoundary = faceLandmark[234].x * 12 - 6;
        const rightBoundary = faceLandmark[454].x * 12 - 6;

        const boundingBox = new THREE.Box3().setFromObject(scene);
        const modelWidth = boundingBox.max.x - boundingBox.min.x;
        const modelHeight = boundingBox.max.y - boundingBox.min.y;

        const boundaryWidth = Math.abs(rightBoundary - leftBoundary);
        const boundaryHeight = Math.abs(lowerBoundary - upperBoundary);

        let scaleX = boundaryWidth / modelWidth;
        let scaleY = boundaryHeight / modelHeight;

        if (scaleX < 1 || scaleY < 1) {
          scene.scale.set(scaleX, scaleY, 1);
          scene.updateMatrixWorld(true);
        } else {
          setScaled(true);
        }
      }
    };

    adjustScaleToFitBoundaries();
  }, [matrix, faceLandmark, scaled, scene]);

  const createFrame = () => {
    if (faceLandmark) {
      const upperBoundary = faceLandmark[10].y * -6 + 3;
      const lowerBoundary = faceLandmark[152].y * -6 + 3;
      const leftBoundary = faceLandmark[234].x * 12 - 6;
      const rightBoundary = faceLandmark[454].x * 12 - 6;

      const points = [
        new THREE.Vector3(leftBoundary, upperBoundary, 0),
        new THREE.Vector3(rightBoundary, upperBoundary, 0),
        new THREE.Vector3(rightBoundary, lowerBoundary, 0),
        new THREE.Vector3(leftBoundary, lowerBoundary, 0),
        new THREE.Vector3(leftBoundary, upperBoundary, 0),
      ];

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, material);

      return <primitive object={line} />;
    }
    return null;
  };

  return (
    <>
      <primitive object={scene} ref={modelRef} />
      {createFrame()}
    </>
  );
};

export default SkullModel;
