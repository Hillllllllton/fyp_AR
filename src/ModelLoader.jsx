import React, { useEffect, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useModelControls } from "./modelControls";

const ModelLoader = ({ file, matrix }) => {
  const { scene } = useThree();
  const [model, setModel] = useState(null);
  const { scaleX, scaleY, scaleZ, offsetX, offsetY, offsetZ, opacity } =
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
        scaledMatrix.elements[13] + offsetY,
        scaledMatrix.elements[14] + offsetZ,
      );
      model.matrix.copy(scaledMatrix);

      if (model.material) {
        model.material.opacity = opacity;
        model.material.transparent = opacity < 1.0;
        model.material.needsUpdate = true;
      } else if (model.children) {
        // If the model is a group, traverse its children and set their materials
        model.traverse((child) => {
          if (child.material) {
            child.material.opacity = opacity;
            child.material.transparent = opacity < 1.0;
            child.material.needsUpdate = true;
          }
        });
      }
    }
  }, [
    model,
    matrix,
    scaleX,
    scaleY,
    scaleZ,
    offsetX,
    offsetY,
    offsetZ,
    opacity,
  ]);

  return model ? <primitive object={model} /> : null;
};

export default ModelLoader;
