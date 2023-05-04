import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const ThreeScene = ({ children }) => {
  const Camera = () => {
    const cameraRef = useRef();

    useFrame(() => {
      if (cameraRef.current) {
        cameraRef.current.lookAt(0, 1, 0);
      }
    });

    return <PerspectiveCamera ref={cameraRef} position={[0, 4, 6.1]} makeDefault />;
  };

  return (
    <Canvas>
      <Camera />
      <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 2.3} minAzimuthAngle={-Math.PI / 8} maxAzimuthAngle={Math.PI / 8} />
      {children}
    </Canvas>
  );
};

export default ThreeScene;