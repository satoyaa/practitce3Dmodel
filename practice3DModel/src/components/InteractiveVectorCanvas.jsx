import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid} from '@react-three/drei';

import InteractiveVector from './InteractiveVector'


const InteractiveVectorCanvas = ({endPoint, setEndPoint, origin}) => {

    return(
    <div style={{ width: '100%', height: '50vh' }}>
        hello
        {/* R3Fのキャンバス（ここが3Dの世界になります） */}
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            {/* 背景色を設定 */}
            <color attach="background" args={['#f0f0f0']} />

            {/* 基本的な照明 */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* 空間のグリッドを表示（XZ平面） */}
            <Grid position={[0, 0, 0]} args={[10, 10]} cellColor="gray" sectionColor="black" sectionThickness={1} fadeDistance={20} />
            {/* 座標軸を表示 (赤=X, 緑=Y, 青=Z) */}
            <axesHelper args={[5]} />

            {/* 上で定義した動かせる矢印コンポーネントを配置 */}
            <InteractiveVector endPoint={endPoint} setEndPoint={setEndPoint} origin={origin}/>

            {/* マウスで視点操作できるようにする */}
            <OrbitControls makeDefault 
            enableRotate = {false} //回転制御
            enablePan={false} //平行移動
            minDistance={2} //縮小下限
            maxDistance={20} //拡大上限
            />
        </Canvas>
    </div>)
}

export default InteractiveVectorCanvas