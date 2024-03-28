import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const SkullbotModel = ({ matrix, faceLandmark}) => {
  // const gltf = useGLTF('/skullbot.glb'); 
  const gltf = useGLTF('public/new_skullbot.glb'); 
  const modelRef = useRef();
  // console.log(gltf.scene.scale)

  useEffect(() => {
    if (matrix) {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const sc = new THREE.Vector3();
    matrix.decompose(position, quaternion, sc);
      let scale = 0.1;   //13.5 for skull
      // Apply the transformation matrix directly to the model
      gltf.scene.scale.set(scale,  scale,  scale);
      gltf.scene.position.set(faceLandmark[9].x * 12 -6, faceLandmark[9].y * -6 +3 , faceLandmark[9].z);
      console.log("posssss:",gltf.scene.position)
      console.log("quaternion:",quaternion)
      gltf.scene.setRotationFromQuaternion(quaternion);

    }
  }, [matrix]); // Re-apply whenever the matrix changes

  return <primitive object={gltf.scene} ref={modelRef} />;
};
export default SkullbotModel;


// const SkullbotModel = ({ matrix, faceLandmark}) => {
//   // const gltf = useGLTF('/skullbot.glb'); 
//   const skullbot = useGLTF('/new_skullbot.glb'); 
//   const modelRef = useRef();
//   // console.log(gltf.scene.scale)
//
//
// useEffect(() => {
//   if (matrix) {
//     // Decompose the transformation matrix into position, quaternion, and scale
//     const position = new THREE.Vector3();
//     const quaternion = new THREE.Quaternion();
//     const scale = new THREE.Vector3();
//     matrix.decompose(position, quaternion, scale);
//
//     // Set skullbot's position and rotation based on the decomposed values
//     skullbot.scene.position.copy(position);
//     skullbot.scene.quaternion.copy(quaternion);
//
//     // Optionally, apply a fixed scale to skullbot if it's not meant to scale with the facial transformation
//     const fixedScale = 0.1; // Adjust this scale to your preference
//     skullbot.scene.scale.set(fixedScale, fixedScale, fixedScale);
//     skullbot.scene.position.set(faceLandmark[9].x * 12 -6, faceLandmark[9].y * -6 +3 , faceLandmark[9].z);
//     skullbot.scene.setRotationFromMatrix(quaternion);
//
//     // Update the world matrix of skullbot to apply these changes
//     skullbot.scene.updateMatrixWorld(true);
//   }
// }, [matrix, skullbot]);
//
//   return <primitive object={skullbot.scene} ref={modelRef} />;
// };
// export default SkullbotModel;
