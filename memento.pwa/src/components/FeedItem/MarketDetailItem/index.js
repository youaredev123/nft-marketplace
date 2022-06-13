import React, { useRef, Suspense } from "react";
import { useGLTF, OrbitControls, Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ImageContainer } from './styles'

const url = 'https://media.bitcoinfiles.org'

const Model = (props) => {
  // TODO: Remove hardcode
  const ref = useRef();
  let imageUrl;

  if (props.props && props.props.animatedImageLocation) {
    imageUrl = `${url}/${props.props.animatedImageLocation}`
  } else {
    imageUrl = 'https://media.bitcoinfiles.org/193f0a78f7cfd729614db7840986e1b134f032cc186b0da9982edb4150be1773';
  }

  const gltf = useGLTF(imageUrl);

  return (
    <group ref={ ref } {...props} dispose={ null } >
      <primitive object={ gltf.scene } scale={ 0.05 } />
    </group>
  )
}

const ImageItem = ({ relic }) => {
  // if (relic && relic.animatedImageLocation) {
  //   useGLTF.preload(`${url}/${relic.animatedImageLocation}`);
  // }

  const imageUrl = `${url}/${relic.staticImageLocation}`

  const renderImage = () => {

    // return <Suspense fallback={<p>Loading...</p>}>
    //   <div style={{ height: window.innerWidth }}>
    //     <Canvas orthographic camera={{ zoom: 50}}>
    //       <OrbitControls enableZoom={true} />
    //       <ambientLight />
    //       <pointLight position={[1, 1, 1]} />
    //       <Model props={relic}/>
    //     </Canvas>
    //   </div>
    //   <Loader />
    // </Suspense>

    return <ImageContainer url={imageUrl}/>
  }

  return <div style={{ position: "relative" }}>{renderImage()}</div>;
};

export default ImageItem;
