
// import { motion, spring } from "framer-motion"
// const Hero = () => {
//   return (

//     <section 
//      className="h-screen bg-gradient-to-b from-purple-900 to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden"
//     >
//         {/* left section --> for text */}
//          <div className="z-40 xl:mb-0 mb-[20%]">
//             <motion.h1 
//              initial={{ opacity: 0, y: 80 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{
//                 type: "spring",
//                 stiffness: 40,
//                 damping: 25,
//                 delay: 1.3,
//                 duration: 1.5,
//              }}
//             className="text-5xl text-white md:text-7xl lg:text-8xl font-bold z-10 mb-6">
//                 Building Fast <br/> Reliable Results
//             </motion.h1>
             
//              <motion.p              
//              initial={{ opacity: 0, y: 80 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{
//                 type: "spring",
//                 stiffness: 40,
//                 damping: 25,
//                 delay: 1.3,
//                 duration: 1.5,
//              }}
//              className=" text-xl md-text-1xl lg-text-2xl text-blue-100 max-w-2xl">
//               I deliver robust, production-ready websites and web apps with speed and precision. 
//               Every project is backed by clean code, clear communication and a commitment to getting it done, on time, every time.
//             </motion.p>



//          </div>
         

//     </section>
//   )
// }

// export default Hero

import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../functionality/Herotext";
import ParallaxBackground from "../functionality/ParallaxBackground.jsx";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../functionality/Loader.jsx";
import { Astronaut } from "../functionality/Astronaut.jsx";


const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space ml-6 mr-2">
      <HeroText />
      <ParallaxBackground/>
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [1, 1, 3] }}>

          <Suspense fallback={<Loader />}>
            <Float>
                <Astronaut
                  scale={isMobile ? [1.3,1.2,1.4] : [1.2,1.1,1.2]}
                  position={isMobile ? [1, 1, 0.5] : [2, 1.3, 0.85]}
                />

                <OrbitControls />
            </Float>
            
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
      
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;