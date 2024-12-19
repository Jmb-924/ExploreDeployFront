import PropTypes from 'prop-types'
import { Canvas } from '@react-three/fiber'
import CoffeeModel3D from '../../components/Model3D/CoffeeModel'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'

const Payment = ({ children }) => {
   return (
      <>
         <h1>Modelo 3D</h1>
         <div style={{ width: "100%", height: "80vh" }}>
            <Canvas camera={{ zoom: 1.5, position: [0, 0.2, 1] }}>
               <ambientLight intensity={1} />
               <pointLight position={[35, 35, 0]} intensity={0.4} />
               <pointLight position={[-35, 35, 0]} intensity={0.4} />
               <Suspense fallback={null}>
                  <CoffeeModel3D />
               </Suspense>
               <OrbitControls />
            </Canvas>

         </div>
      </>
   )
}

Payment.propTypes = {
   children: PropTypes.node
}

export default Payment