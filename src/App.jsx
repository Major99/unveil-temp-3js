import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ScrollControls } from '@react-three/drei';
import { ImageRail } from './ImageRail';
import './index.css';

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

function App() {
  return (
    <>
      <Canvas
        camera={{ position: [5, 2, 8], fov: 40 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['white']} />

        <Suspense fallback={null}> 
          <Environment files="/studio_small_03_4k.exr" background={false} /> 
        </Suspense>

        <ambientLight intensity={0.4} /> 
        <directionalLight
          intensity={2.5} 
          position={[5, 5, 10]}
          castShadow
        />

        <ScrollControls pages={scrollPages} damping={0.2}>
          <Suspense fallback={null}>
            <ImageRail imageUrls={images} />
          </Suspense>
        </ScrollControls>

      </Canvas>
    </>
  );
}

export default App;