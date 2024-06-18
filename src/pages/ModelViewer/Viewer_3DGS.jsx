import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import React, { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
// import './viewer.css';


import SidePanel from './SidePanel/SidePanel';


console.log(GaussianSplats3D)

export default function Viewer_GS() {

    const myRef = useRef(null);
    const viewerRef = useRef(null);
    const [isSceneReady,setIsSceneReady] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const url = "http://10.177.35.181:8081/common/GSviewer/splat"+'?id='+id

    useEffect(()=>{
        // const rootElement = document.getElementById('renderWindow');
        // rootElement.style.width = renderWidth + 'px';
        // rootElement.style.height = renderHeight + 'px';
        // rootElement.style.position = 'absolute';
        
        const renderWidth1 = myRef.current.clientWidth;
        const renderHeight1 = myRef.current.clientHeight;
        
        const {renderer, renderWidth, renderHeight} = setupRenderer(renderWidth1,renderHeight1);
        const camera = setupCamera(renderWidth, renderHeight);
        // const threeScene = setupThreeScene();
        // const controls = setupControls(camera, renderer);

        const viewer = new GaussianSplats3D.Viewer({
            'selfDrivenMode': true,
            'renderer': renderer,
            'camera': camera,
            'gpuAcceleratedSort': true,
            'sharedMemoryForWorkers': false,

            
            // 'sphericalHarmonicsDegree': 3
            // 'focalAdjustment':1
            // 'SceneRevealMode': 2
            // 'rootElement': myRef.current,
            "streamView":true
        });

        
        viewer.addSplatScene(url,
            {
                'streamView': true,
                'splatAlphaRemovalThreshold': 20,
                'format': GaussianSplats3D.SceneFormat.Splat,
            },
        ).then(()=>{
            viewer.start();
            // viewer.renderer.domElement.addEventListener('pointerdown', (event)=>onMouseClick(event), false);
        });
        
        
        // threeScene.add(viewer);

        // requestAnimationFrame(update);
        // function update() {
        // requestAnimationFrame(update);
        // controls.update();
        // renderer.render(threeScene, camera);
        // }

        
     
        // const hits = []
        // viewer.intersectSplatMesh(splatMesh, hits)

        viewerRef.current = viewer;
        setIsSceneReady(true);
        console.log(myRef.current.getBoundingClientRect())
    },[])

    const setupRenderer = (renderWidth,renderHeight) => {
        const renderer = new THREE.WebGLRenderer({
            antialias: false
        });
        renderer.setSize(renderWidth, renderHeight);
        myRef.current.append(renderer.domElement);
        
        return {
            'renderer': renderer,
            'renderWidth': renderWidth,
            'renderHeight': renderHeight
        }
        
    }

    const setupCamera = (renderWidth, renderHeight) => {
        const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
        camera.position.copy(new THREE.Vector3().fromArray([-3, -3, -3]));
        camera.lookAt(new THREE.Vector3().fromArray([0, 0, 0]));
        camera.up = new THREE.Vector3().fromArray([0, -1, 0]).normalize();
        return camera;
    }

    // const setupThreeScene = () => {
    //     const threeScene = new THREE.Scene();
    //     const boxColor = 0xBBBBBB;
    //     const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    //     const boxMesh = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial({'color': boxColor}));
    //     threeScene.add(boxMesh);
    //     boxMesh.position.set(3, 2, 2);
    //     return threeScene;
    // }

    // const setupControls = (camera, renderer) => {
    //     const controls = new GaussianSplats3D.OrbitControls(camera, renderer.domElement);
    //     controls.rotateSpeed = 0.5;
    //     controls.maxPolarAngle = Math.PI * .75;
    //     controls.minPolarAngle = 0.1;
    //     controls.enableDamping = true;
    //     controls.dampingFactor = 0.05;
    //     return controls;
    // }

    return(
            <>
                <div id='rootDiv' style={{position:'absolute',width:"100%",height:'100%'}}>
                    
                    
                    <div id='renderWindow' style={{position:'absolute',width:"100%",height:'100%'}}  ref={myRef}>
                        
                    </div>
                </div>     
            </>
    )

}