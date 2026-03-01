import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';

const InteractiveVector = ({ endPoint, setEndPoint, origin }) => {
  const arrowRef = useRef();
  const meshRef = useRef(); 

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      setEndPoint(new THREE.Vector3(x / 50, -y / 50, 0));
    },
    {
      from: () => [endPoint.x * 50, -endPoint.y * 50],
    }
  );

  useFrame(() => {
    // まだオブジェクトがレンダリングされていない場合はスキップ
    if (!meshRef.current || !arrowRef.current) return;

    // 1. 球体（現在位置）を、目標位置（endPoint）に向かって滑らかに近づける（Lerp）
    // 第2引数の `0.1` は「1フレームあたりに目標へ近づく割合」です。
    // 値を小さく（0.05など）するとゆっくりになり、大きく（0.3など）するとキビキビ動きます。
    meshRef.current.position.lerp(endPoint, 0.1);

    // 2. 移動中の球体の「現在位置」を取得
    const currentPos = meshRef.current.position;
    
    // 3. 現在位置に基づいて、矢印の向きと長さを計算
    const direction = currentPos.clone().sub(origin).normalize();
    const length = currentPos.distanceTo(origin);
    if (length > 0) {
      arrowRef.current.setDirection(direction);
      arrowRef.current.setLength(length, 0.5, 0.2);
    }
  });

  return (
    <group>
      <arrowHelper 
        ref={arrowRef}
        args={[
          new THREE.Vector3(1, 0, 0), 
          origin,                     
          1,                          
          "royalblue",                
          0.5,
          0.2
        ]} 
      />
      <mesh ref={meshRef} {...bind()}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="red" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export default InteractiveVector;