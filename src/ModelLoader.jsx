import React, { useEffect, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useModelControls } from "./modelControls";

const ModelLoader = ({ file, matrix }) => {
  const { scene } = useThree();
  const [model, setModel] = useState(null); // State to store the loaded model
  const { scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ } =
    useModelControls();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const loader = new GLTFLoader();
        loader.parse(reader.result, "", (gltf) => {
          const existingModel = model || gltf.scene;
          existingModel.matrixAutoUpdate = false;
          setModel(existingModel);
          if (!model) {
            // If model is not already added to the scene
            scene.add(existingModel);
          }
        });
      };
    }
  }, [file, scene]);

  useEffect(() => {
    if (model && matrix) {
      let scaledMatrix = matrix
        .clone()
        .scale(new THREE.Vector3(scaleX, scaleY, scaleZ));
      scaledMatrix.setPosition(
        scaledMatrix.elements[12] + offsetX,
        scaledMatrix.elements[13] + offsetY, // Apply the offset to the Y position
        scaledMatrix.elements[14] + offsetZ,
      );
      model.matrix.copy(scaledMatrix);
    }
  }, [model, matrix, scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ]); // Re-apply whenever the matrix, scale, or offset changes

  return model ? <primitive object={model} /> : null;
};

export default ModelLoader;
