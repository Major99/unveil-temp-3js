import React, { useRef, useMemo } from 'react';
import { useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { FramedGlassPlane } from './FramedGlassPlane';

const planeRotation = [THREE.MathUtils.degToRad(10), -THREE.MathUtils.degToRad(30), -THREE.MathUtils.degToRad(5)];

const config = {
    xOffset: 1.5,      
    yOffset: 1.0,     
    zOffset: -0.5,     
    planeWidth: 4,    
    planeHeight: 3    
};

export function ImageRail({ imageUrls = [],isDragging }) {
    const groupRef = useRef();
    const scrollData = useScroll();
    const meshRefs = useRef([]);
    meshRefs.current = imageUrls.map((_, i) => meshRefs.current[i] ?? React.createRef());
    const numImages = imageUrls.length;
    const textures = useTexture(imageUrls.map(item => item.imageUrl));
    textures.forEach(tex => {
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    });

    const railStepVector = useMemo(() => new THREE.Vector3(config.xOffset, config.yOffset, config.zOffset), []);
    const basePositions = useMemo(() =>
        imageUrls.map((_, i) => new THREE.Vector3(
            i * config.xOffset, i * config.yOffset, i * config.zOffset
        )),
        [numImages] 
    );
    const totalRailLength = useMemo(() => imageUrls.length - 1, [imageUrls.length]); // In 'steps'


    useFrame(() => {
        if (scrollData && textures.length > 0 && numImages > 0) {
            const scrollProgress = scrollData.offset * totalRailLength;

            meshRefs.current.forEach((ref, index) => {
                if (ref.current) {
                    const basePosition = new THREE.Vector3(
                        index * config.xOffset,
                        index * config.yOffset,
                        index * config.zOffset
                    );
                    const scrollOffsetVector = railStepVector.clone().multiplyScalar(-scrollProgress);

                    const finalPosition = basePosition.add(scrollOffsetVector);
                    ref.current.position.copy(finalPosition);

                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {imageUrls.map((item, index) => {
                const position = basePositions[index].toArray();


                return (
                    <FramedGlassPlane
                    key={item.id ?? index} 
                    ref={meshRefs.current[index]}
                    position={position}
                    rotation={planeRotation}
                    textureUrl={item.imageUrl} 
                    targetUrl={item.targetUrl}
                    args={[config.planeWidth, config.planeHeight]}
                    isDragging={isDragging}
                    />
                );
            })}
        </group>
    );
}