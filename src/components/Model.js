import React, { useState, useMemo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import model from '../assets/storefront.glb';

const Model = () => {
  const geom = useLoader(GLTFLoader, model);

  const objectMaterials = useMemo(() => {
    const materials = {};
    geom.scene.traverse((child) => {
      if (['FrontDoor', 'RightWindow', 'LeftWindow'].includes(child.name) && child.material) {
        materials[child.name] = {
          material: child.material,
          isHovered: false,
        };
      }
    });
    return materials;
  }, [geom]);

  const [hoveredObject, setHoveredObject] = useState(null); // track currently hovered object

  const handlePointerOver = (e, objName) => {
    e.stopPropagation();
    setHoveredObject(objName); // update currently hovered object
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredObject(null); // reset currently hovered object
  };

  // update material colors based on the hovered object
  Object.keys(objectMaterials).forEach((objectName) => {
    const isHovered = hoveredObject === objectName; // check if the current object is being hovered
    objectMaterials[objectName].isHovered = isHovered;
    const color = isHovered ? 'hotpink' : 'white';
    objectMaterials[objectName].material.color.set(color);
  });

  return (
    <group scale={[1, 1, 1]}>
      <primitive
        object={geom.scene}
        onPointerOver={(e) => handlePointerOver(e, e.object.name)}
        onPointerOut={handlePointerOut}
      />
      {/* render a mesh for each material that is hovered */}
      {Object.keys(objectMaterials).map((objectName) => {
        const { material, isHovered } = objectMaterials[objectName];
        if (isHovered) {
          return <mesh key={objectName} material={material} />;
        }
        return null;
      })}
    </group>
  );
};

export default Model;

