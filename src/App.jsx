import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ScrollControls } from '@react-three/drei';
import { ImageRail } from './ImageRail';
import { DragController } from './DragController';
import './index.css';
import { useSpring as useSpringThree, config as springConfig } from '@react-spring/three'; 

const images = [
  { id: 1, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 2, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 3, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 4, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 5, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 6, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 7, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 8, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 9, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 10, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 11, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 12, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 13, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id:14, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 15, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 16, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 17, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 18, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
  { id: 19, imageUrl: '/image1.jpg', targetUrl: '/details/project-1' },
  { id: 20, imageUrl: '/image2.jpeg', targetUrl: '/details/project-2' },
];

const scrollPages = images.length / 2;

const INITIAL_FOV = 40; 
const DRAGGING_FOV = 50; 

function SceneContent({ isDragging, setIsDragging }) {
  const camera = useThree(state => state.camera); 

  const { animatedFov } = useSpringThree({
      animatedFov: isDragging ? DRAGGING_FOV : INITIAL_FOV,
      config: springConfig.gentle 
  });

  useFrame(() => {
      const currentAnimatedFov = animatedFov.get(); 
      if (camera.fov !== currentAnimatedFov) {
          camera.fov = currentAnimatedFov;
          camera.updateProjectionMatrix(); 
      }
  });

  return (
      <>
      <color attach="background" args={['white']} />
{/* 
      <Suspense fallback={null}> 
        <Environment files="/studio_small_03_4k.exr" background={false} /> 
      </Suspense> */}

      <ambientLight intensity={0.4} /> 
      <directionalLight
        intensity={2.5} 
        position={[5, 5, 10]}
        castShadow
      />
      <DragController setIsDragging={setIsDragging} />

      <ScrollControls pages={scrollPages} damping={0.2}>
        <Suspense fallback={null}>
          <ImageRail imageUrls={images}  isDragging={isDragging} />
        </Suspense>
      </ScrollControls>
      </>
  );
}

function App() {
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
      console.log("App isDragging state:", isDragging);
  }, [isDragging]);
  const initialCameraPosition = [4, 2, 8];
  return (
    <>
      <Canvas
        // camera={{ position: [5, 2, 8], fov: 40 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        style={{ cursor: isDragging ? 'grabbing' : 'auto' }}
      >
      <PerspectiveCamera
          makeDefault
          position={initialCameraPosition}
          fov={INITIAL_FOV}
          // near={0.1}
          // far={100}
      />
      <SceneContent isDragging={isDragging} setIsDragging={setIsDragging} />

      </Canvas>
    </>
  );
}

export default App;