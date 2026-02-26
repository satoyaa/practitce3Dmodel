import { useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid} from '@react-three/drei';
import * as THREE from 'three';

import InteractiveVectorCanvas from './components/InteractiveVectorCanvas.jsx'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
