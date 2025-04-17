import React, { useRef, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function DragController({ setIsDragging }) {
  const scrollData = useScroll();
  const { size } = useThree();
  const isDown = useRef(false);
  const dragStart = useRef({ y: 0, scrollToObject: 0 });
  const backgroundPlaneRef = useRef();
  
  const handlePointerDown = useCallback((event) => {
    if (!event.intersections || event.intersections.length === 0 || event.intersections[0].object !== backgroundPlaneRef.current) {
      return; 
    }

    event.stopPropagation(); 
    isDown.current = true;
    setIsDragging(true); 
    dragStart.current = { y: event.clientY, scrollToObject: scrollData.offset };
    try { event.target.setPointerCapture(event.pointerId); } catch (error) { console.error("Pointer capture failed:", error) }

  }, [scrollData, setIsDragging]); 

  const handlePointerMove = useCallback((event) => {
    if (!isDown.current || !scrollData.el) return;

    const deltaY = event.clientY - dragStart.current.y;
    const scrollSensitivity = 1.0;
    const speedMultiplier = 2.0;
    const deltaOffset = (-deltaY / size.height) * scrollSensitivity * speedMultiplier;
    let newOffset = dragStart.current.scrollToObject + deltaOffset;
    newOffset = Math.max(0, Math.min(1, newOffset));
    const scrollHeight = scrollData.el.scrollHeight;
    const clientHeight = scrollData.el.clientHeight;
    const finalScrollTop = newOffset * (scrollHeight - clientHeight);

    scrollData.el.scrollTop = finalScrollTop;

  }, [scrollData, size.height]); 

  const handlePointerUpOrLeave = useCallback((event) => {
    if (!isDown.current) return;
    console.log("DragController: Pointer Up/Leave");
    isDown.current = false;
    setIsDragging(false);
    try {
        if (event.target && typeof event.target.hasPointerCapture === 'function' && event.target.hasPointerCapture(event.pointerId)) {
            event.target.releasePointerCapture(event.pointerId);
        }
    } catch (error) { console.error("Pointer release failed:", error); }
  }, [setIsDragging]); 

  return (
    <mesh
      ref={backgroundPlaneRef} 
      position={[0, 0, -20]} 
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      visible={false}
    >
      <planeGeometry args={[100, 100]} /> 
      <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}