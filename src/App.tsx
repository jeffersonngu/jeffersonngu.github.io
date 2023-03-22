import React, { useRef, useState } from 'react'
import './styles.css';
import * as THREE from 'three'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

interface boxProps {
  size: number
}

function Box(props: ThreeElements['mesh'] | boxProps) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const size = (props as boxProps).size;
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta, ref.current.rotation.y += delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas id='canvas'
    shadows
    eventSource={document.getElementById('root')!}
    eventPrefix="client"
    camera={{ position: [20, 0.9, 20], fov: 26 }} >
      <Scene />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  )
}

function Scene() {
  const maincanvas = document.getElementById('canvas')!;
  maincanvas.style.position = 'fixed';
  maincanvas.style.top = '0';
  maincanvas.style.left = '0';
  maincanvas.style.zIndex = '-99';
  const scene = useRef() as React.Ref<THREE.Group>;
  return (
    <group ref={scene}>
      <Box position={[0, 0, 0]} size={1} />
      <Box position={[5, 1, 0]} size={1.5} />
      <Box position={[10, -1, 0]} size={1} />
    </group>
  );
}

/* const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.getElementById('#canvas')!;
const renderer = new THREE.WebGLRenderer({
  canvas
});

renderer.render(scene, camera);

//document.body.appendChild(renderer.domElement);
//canvas.appendChild(renderer.domElement); 

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); */