import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree, } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera ,useVideoTexture, Plane, CameraControls} from '@react-three/drei';
import * as THREE from 'three';
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';

import  SkullModel  from './skull';
import  SkullbotModel  from './skullbot';


const VideoComponent = ({ videoRef, setIsWebcamReady }) => {
  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: "user", width: window.innerWidth, height: window.innerHeight} });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // console.log("videoRef:", videoRef.current.videoHeight)
          videoRef.current.onloadedmetadata = () => {
            setIsWebcamReady(true); // Signal that webcam is ready
          };
        }
      } catch (error) {
        console.error('Error accessing the webcam', error);
      }
    }

    setupWebcam();
  }, [videoRef, setIsWebcamReady]);

  return <video ref={videoRef} autoPlay playsInline id="video" style={{ display: 'none' }} />;
  // return <video ref={videoRef} autoPlay playsInline id="video" />;

};

function FrameActions({ videoRef, isWebcamReady, setFaceLandmark, setModelMatrix , faceLandmarker}) {
  useFrame(() => {
    if (isWebcamReady && faceLandmarker && videoRef.current) {
   
      try {
      const results = faceLandmarker.detectForVideo(videoRef.current, Date.now());
      // console.log("Results:", results);
      if (results && results.facialTransformationMatrixes.length > 0) {
        const matrixData = results.facialTransformationMatrixes[0].data;
        const matrix = new THREE.Matrix4().fromArray(matrixData);
        // const facelandmarkData = results.faceLandmarks[0][151];
        const facelandmarkData = results.faceLandmarks[0];
        // console.log("Facelandmark:", facelandmark);
        setModelMatrix(matrix);
        setFaceLandmark(facelandmarkData);
      }
      } catch (error) {
        console.error('Error detecting facessssss', error);
      }
    }
  });

  return null; // This component does not render anything
}
function VideoMaterial({ videoRef  }) {
  const texture = useVideoTexture(videoRef.current.srcObject)

  return <meshBasicMaterial map={texture} toneMapped={false} />
}


function FullScreenPlane({videoRef}) {
  // const { viewport } = useThree();
  const height = window.innerHeight;
  const width = (window.innerHeight*1280) / 720;

  return (
    <Plane args={[width, height]} position={[0, 0, -750]}>
       <VideoMaterial videoRef={videoRef} />
    </Plane>
  );
}


function App() {
  // const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(new MediaStream());
  const [isWebcamReady, setIsWebcamReady] = useState(false); 
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [faceLandmark, setFaceLandmark] = useState(null);   //store the landmark's facetrabsformation matrix
  const [modelMatrix, setModelMatrix] = useState(null);   //store the landmark's facetrabsformation matrix
  const width = (window.innerHeight*1280) / 720;
  const aspectRatio = width / window.innerHeight;



  useEffect(() => {
    // MediaPipe setup and initialization logic here...
    // When the face landmarker is ready, set it to state
    async function initMediaPipe() {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm");
      const landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`, 
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        outputFacialTransformationMatrixes: true,
        outputFaceBlendshapes: false,
        

      });
      console.log('Face Landmarker is ready');
      setFaceLandmarker(landmarker);
    }

    initMediaPipe();

  }, []);



  return (
    <div className="canvas-container">
      <VideoComponent videoRef={videoRef} setIsWebcamReady={setIsWebcamReady} />
        <Canvas >
      <OrbitControls />
      <PerspectiveCamera manual fov={60} near={0.01} far={5000} aspect={aspectRatio} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 0]} />
      <Suspense fallback={null}>
       {modelMatrix && (
            <>
              <SkullbotModel matrix={modelMatrix} faceLandmark={faceLandmark} />
              <SkullModel matrix={modelMatrix} faceLandmark={faceLandmark} />
            </>
          )}
      </Suspense>
      <Suspense fallback={null}>
        <FullScreenPlane videoRef={videoRef} />
      </Suspense>
        <FrameActions 
          videoRef={videoRef} 
          isWebcamReady={isWebcamReady} 
          setFaceLandmark={setFaceLandmark} 
          setModelMatrix={setModelMatrix} 
          faceLandmarker={faceLandmarker}
        />
      </Canvas>
    </div>
  );
}

export default App;


