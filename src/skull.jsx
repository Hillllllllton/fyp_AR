import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const SkullModel = ({ matrix }) => {
  const gltf = useGLTF('fyp_AR/public/skull_downloadable.glb'); 
  const modelRef = useRef();

  useEffect(() => {
    if (matrix) {
      let scale = 15;   //13.5 for skull
      // Apply the transformation matrix directly to the model
      let m = matrix.scale(new THREE.Vector3(scale, scale , scale));
      // let m = matrix;
      // console.log(matrix.elements);
      gltf.scene.matrixAutoUpdate = false;
      gltf.scene.matrix.copy(m);
    console.log(gltf.scene);
      // gltf.scene.translateY(0).updateMatrix();
      // gltf.scene.updateMatrixWorld(true);
    }
  }, [matrix]); // Re-apply whenever the matrix changes

  return <primitive object={gltf.scene} ref={modelRef} />;
};
export default SkullModel;


