import React, { forwardRef, useState } from 'react';
import { useCursor, useTexture } from '@react-three/drei';
import * as THREE from 'three';
// eslint-disable-next-line no-unused-vars
import { useSpring, a } from '@react-spring/three';

export const FramedGlassPlane = forwardRef(({
    textureUrl,
    targetUrl,
    position,
    rotation,
    args = [4, 3],
    frameBorder = 0.1,
    frameColor = '#686868FF',
    frameProps = {},
    isDragging,
    ...props
}, ref) => {

    const texture = useTexture(textureUrl);
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

    const imageWidth = args[0];
    const imageHeight = args[1];
    const frameWidth = imageWidth + frameBorder * 0.5;
    const frameHeight = imageHeight + frameBorder * 0.5;

    const frameControls = {
        color: frameColor,
        roughness: 0.8,
        metalness: 0.1,
        opacity: 0.9,
        transparent: true,
        side: THREE.DoubleSide,
        ...frameProps
    };
    frameControls.transparent = frameControls.opacity < 1;

    const [isHovered, setIsHovered] = useState(false);
    useCursor(isHovered && !isDragging);

    const hoverSlideX = 1.5;
    const hoverSlideZ = 0.1; 
    const { hoverPosition } = useSpring({
        hoverPosition: isHovered && !isDragging  ? [hoverSlideX, 0, hoverSlideZ] : [0, 0, 0],
        scale: isDragging ? 0.8 : (isHovered ? 1.08 : 1),
        config: { mass: 0.5, tension: 250, friction: 30 } 
    });

    const handleClick = (event) => {
        event.stopPropagation();
        if (targetUrl) {
            console.log('Navigating to:', targetUrl);
            window.location.href = targetUrl; 
        } else {
            console.warn('FramedGlassPlane clicked, but no targetUrl prop provided.');
        }
    };

    return (
        <group
            ref={ref}
            position={position}
            rotation={rotation}
            {...props}
            onPointerOver={(e) => { e.stopPropagation(); !isDragging && setIsHovered(true); }}
            // eslint-disable-next-line no-unused-vars
            onPointerOut={(e) => setIsHovered(false)}
            onClick={handleClick} 
        >
            <a.group position={hoverPosition}>

                <mesh position-z={-0.01}>
                    <planeGeometry args={[frameWidth, frameHeight]} />
                    <meshStandardMaterial
                        color={frameControls?.color ?? frameColor}
                        roughness={frameControls?.roughness ?? 0.8}
                        metalness={frameControls?.metalness ?? 0.1}
                        opacity={frameControls?.opacity ?? 0.9}
                        transparent={frameControls?.opacity < 1}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh >
                    <planeGeometry args={[imageWidth, imageHeight]} />
                    <meshPhysicalMaterial
                        map={texture}        
                        color={'white'}       
                        metalness={0}        
                        roughness={1}      
                        opacity={0.85}        
                        transparent={true}   
                        side={THREE.DoubleSide}
                        envMapIntensity={0.9}
                        transmission={0.95}
                        reflectivity={0.2}
                        clearcoat={1}
                    />
                </mesh>
            </a.group>

        </group>
    );
});