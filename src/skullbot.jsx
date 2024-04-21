import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSkullbotControls } from "./modelControls";

const SkullbotModel = ({ matrix, faceLandmark }) => {
  const gltf = useGLTF("new_skullbot.glb");
  const modelRef = useRef();

  const { landmarkIndex, scale } = useSkullbotControls();

  useEffect(() => {
    if (matrix && faceLandmark && faceLandmark[landmarkIndex]) {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const sc = new THREE.Vector3();
      matrix.decompose(position, quaternion, sc);

      // Apply the transformation matrix directly to the model
      gltf.scene.scale.set(scale, scale, scale);
      gltf.scene.position.set(
        faceLandmark[landmarkIndex].x * 12 - 6,
        faceLandmark[landmarkIndex].y * -6 + 3,
        faceLandmark[landmarkIndex].z,
      );
      gltf.scene.setRotationFromQuaternion(quaternion);
    }
  }, [matrix, faceLandmark, landmarkIndex, scale]);

  return <primitive object={gltf.scene} ref={modelRef} />;
};

export default SkullbotModel;
