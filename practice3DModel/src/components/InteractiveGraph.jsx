// src/components/PolynomialGraph.jsx
import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveGraph = () => {
  // y = x^2 + x + 1 の座標を計算して配列化する
  const points = useMemo(() => {
    const pts = [];
    // xを -5 から 5 まで 0.1 刻みでループ
    for (let x = -5; x <= 5; x += 0.1) {
      const y = Math.pow(x, 2) + x + 1; // y = x^2 + x + 1
      const z = 0; // 2DグラフなのでZは常に0
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []); // 空の依存配列を渡し、初回のみ計算させる

  return (
    <group>
      {/* 計算した点群をLineコンポーネントに渡して線を描く */}
      <Line
        points={points}
        color="hotpink" // 線の色
        lineWidth={3}   // 線の太さ（ピクセル単位）
      />
    </group>
  );
};

export default InteractiveGraph;