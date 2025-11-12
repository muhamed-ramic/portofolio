// @flow strict

"use client";

import { useRef } from "react";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { Canvas, useFrame} from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from '@react-three/drei'


const ImageCube = () => {
  const meshRef = useRef();
  const textures = useTexture(
    ["/profile.jpg", "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x+= 0.005;
      meshRef.current.rotation.y+= 0.005;
      meshRef.current.rotation.z+= 0.005;
    }
  });

  const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

  return (
    <mesh ref={meshRef} material={materials}>
      <boxGeometry args={[5, 5, 5]} />
    </mesh>
  );
};

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who am I?
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </div>

        <div className="flex justify-center order-1 lg:order-2">
          <Canvas style={{ width: "300px", height: "300px" }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <ImageCube />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
