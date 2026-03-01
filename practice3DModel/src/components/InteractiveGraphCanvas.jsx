import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid} from '@react-three/drei';

import InteractiveGraph from './InteractiveGraph'


const InteractiveGraphCanvas = ({endPoint, setEndPoint, origin}) => {

    return(
    <div style={{ width: '100%', height: '50vh' }}>
        hello
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <color attach="background" args={['#f0f0f0']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Grid position={[0, 0, 0]} args={[10, 10]} cellColor="gray" sectionColor="black" sectionThickness={1} fadeDistance={20} />
            <axesHelper args={[5]} />
            <InteractiveGraph></InteractiveGraph>

            <OrbitControls makeDefault 
            enableRotate = {false} //回転制御
            enablePan={true} //平行移動
            enableZoom={true} //ズーム制御
            minDistance={2} //縮小下限
            maxDistance={20} //拡大上限
            
            />
        </Canvas>
    </div>)
}

export default InteractiveGraphCanvas