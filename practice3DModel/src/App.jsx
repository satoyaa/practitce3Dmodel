import { useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid} from '@react-three/drei';
import * as THREE from 'three';
import { InlineMath, BlockMath } from 'react-katex';

import InteractiveVectorCanvas from './components/InteractiveVectorCanvas.jsx'
import AnswerIdeal from './components/AnswerIdeal.jsx';
import AnswerReal from './components/AnswerReal.jsx'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const literals = [`数や文字を長方形の形に並べたものを行列と呼びます。例えば`,
  `\\begin{equation}\\begin{bmatrix} 1 & 0 & -1 \\\\ 3 & 0 & 2 \\end{bmatrix}\\end{equation}`,
  `\\begin{equation}\\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & a & b \\\\ 3 & b & a \\end{bmatrix}\\end{equation}`,
  `は行列です。左上の行列は行（＝行列の横の並び）が2本、列（＝縦の並び）が3本からなるので、型行列 、また右上の行列は行が3本、列も3本なので<InlineMath math="3 \times 3" /> 型の行列 と言います。線形代数の前半では、このような行列の性質について調べていきます。今回の授業ノートでは行列の基本的な用語について、例を交えながら説明します。`,
];


function App() {
  const [count, setCount] = useState(0)

  const [endPoint, setEndPoint] = useState(new THREE.Vector3(1, 1, 0));
  const [origin, setOrigin] = useState(new THREE.Vector3(0, 0, 0));

  const handleButtonClick = (calc) => {
    if (calc === "addX"){
      setCount((prevCount) => prevCount + 1);
      setEndPoint((prev) => new THREE.Vector3(prev.x+1, prev.y, prev.z));
      setOrigin((prev) => new THREE.Vector3(prev.x+1, prev.y, prev.z));
    }
    if (calc === "addY"){
      setCount((prevCount) => prevCount + 1);
      setEndPoint((prev) => new THREE.Vector3(prev.x, prev.y+1, prev.z));
      setOrigin((prev) => new THREE.Vector3(prev.x, prev.y+1, prev.z));
    }
    if (calc === "addZ"){
      setCount((prevCount) => prevCount + 1);
      setEndPoint((prev) => new THREE.Vector3(prev.x, prev.y, prev.z+1));
      setOrigin((prev) => new THREE.Vector3(prev.x, prev.y, prev.z+1));
    }
    if (calc === "minusX"){
      setCount((prevCount) => prevCount - 1);
      setEndPoint((prev) => new THREE.Vector3(prev.x-1, prev.y, prev.z));
      setOrigin((prev) => new THREE.Vector3(prev.x-1, prev.y, prev.z));
    }
    if (calc === "minusY"){
      setCount((prevCount) => prevCount - 1);
      setEndPoint((prev) => new THREE.Vector3(prev.x, prev.y-1, prev.z));
      setOrigin((prev) => new THREE.Vector3(prev.x, prev.y-1, prev.z));
    }
    if (calc === "minusZ"){
      setCount((prevCount) => prevCount - 1);
      setEndPoint((prev) => new THREE.Vector3(prev.x, prev.y, prev.z-1));
      setOrigin((prev) => new THREE.Vector3(prev.x, prev.y, prev.z-1));
    }
    if (calc === "scaleUp"){
      setCount((prevCount) => prevCount + 1);
      //setEndPoint((prev) => new THREE.Vector3((prev.x-origin.x)*2+origin.x, (prev.y-origin.y)*2+origin.y, (prev.z-origin.z)*2+origin.z));
      setEndPoint((prev) => {
      return prev.clone().sub(origin).multiplyScalar(2).add(origin);
      });
    }
    if (calc === "scaleDown"){
      setCount((prevCount) => prevCount - 1);
      //setEndPoint((prev) => new THREE.Vector3((prev.x-origin.x)*0.5+origin.x, (prev.y-origin.y)*.5+origin.y, (prev.z-origin.z)*0.5+origin.z));
      setEndPoint((prev) => {
      return prev.clone().sub(origin).multiplyScalar(0.5).add(origin);
      });
    }
    
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>理想</h1>
      <AnswerIdeal></AnswerIdeal>
      <h1>現実</h1>
      <AnswerReal literals={literals}></AnswerReal>
      <div className="card">
        <button onClick={() => handleButtonClick("addX")}>
          +X count is {count}
        </button>
        <button onClick={() => handleButtonClick("addY")}>
          +Y count is {count}
        </button>
        <button onClick={() => handleButtonClick("addZ")}>
          +Z count is {count}
        </button>
        <button onClick={() => handleButtonClick("minusX")}>
          -X count is {count}
        </button>
        <button onClick={() => handleButtonClick("minusY")}>
          -Y count is {count}
        </button>
        <button onClick={() => handleButtonClick("minusZ")}>
          -Z count is {count}
        </button>
        <button onClick={() => handleButtonClick("scaleUp")}>
          Scale Up count is {count}
        </button>
        <button onClick={() => handleButtonClick("scaleDown")}>
          Scale Down count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <InteractiveVectorCanvas endPoint={endPoint} setEndPoint={setEndPoint} origin={origin}/>
    </>
  )
}

export default App
