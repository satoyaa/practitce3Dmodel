import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber'; // 追加
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';

const InteractiveVector = ({ endPoint, setEndPoint, origin }) => {
  const arrowRef = useRef();
  const meshRef = useRef(); // 追加: 赤い球体（ハンドル）を直接操作するためのRef

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      setEndPoint(new THREE.Vector3(x / 50, -y / 50, 0));
    },
    {
      from: () => [endPoint.x * 50, -endPoint.y * 50],
    }
  );

  // --- 変更点: useEffectの代わりにuseFrameを使用 ---
  // 毎フレーム（約60回/秒）実行され、アニメーションを担当します
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
    
    // 4. 矢印を更新して球体に追従させる
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

      {/* 変更点: position={endPoint} を削除し、ref={meshRef} を追加 */}
      {/* 座標の管理は useFrame 内の lerp に完全に任せます */}
      <mesh ref={meshRef} {...bind()}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="red" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export default InteractiveVector;