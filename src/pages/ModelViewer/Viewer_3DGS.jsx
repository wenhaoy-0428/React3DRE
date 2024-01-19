import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

import { closeViewer, openViewer, openViewer_3dgs } from '../../services/ant-design-pro/api';
import { Divider } from 'antd';
// import * as SPLAT from "gsplat";
// console.log(SPLAT)
import './gsviewer.css';
import * as SPLAT from '../../components/gsplat/src/index'
// console.log(SPLAT)


export default function Viewer_3DGS(){

   
    useEffect(()=>{
     
        const canvas = document.getElementById("canvas");
        const progressDialog = document.getElementById("progress-dialog");
        const progressIndicator = document.getElementById("progress-indicator");
        console.log(canvas,progressDialog,progressIndicator)
        console.log(SPLAT)
        const renderer = new SPLAT.WebGLRenderer(canvas);
        const scene = new SPLAT.Scene();
        const camera = new SPLAT.Camera();
        const controls = new SPLAT.OrbitControls(camera, canvas);

        const format = '';

        
        
        // const title='1'
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');

        async function main() {
            // const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k-mini.splat";
            // const url = 'http://10.177.35.49:8083/gs/viewer';
            const url = "http://10.177.35.49:8081/common/GSviewer"+'?id='+id
            // const url = "./point_cloud.ply"
            // await SPLAT.PLYLoader.LoadAsync(url, scene, (progress) => progressIndicator.value = progress * 100, format);
            await SPLAT.Loader.LoadAsync(url, scene, (progress) => {
                progressIndicator.value = progress * 100;
            });
            progressDialog.close()
            // scene.saveToFile('test.splat');
            
            

            const handleResize = () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            const frame = () => {
                controls.update();
                renderer.render(scene, camera);
                
                // console.log(camera.projectionMatrix)
                requestAnimationFrame(frame);
            };
            
            handleResize();
            window.addEventListener("resize", handleResize);
           
            requestAnimationFrame(frame);
            
            let loading = false;
            const selectFile = async (file) => {
                if (loading) return;
                loading = true;
                if (file.name.endsWith(".splat")) {
                    await SPLAT.Loader.LoadFromFileAsync(file, scene, (progress) => {
                        progressIndicator.value = progress * 100;
                    });
                } else if (file.name.endsWith(".ply")) {
                    await SPLAT.PLYLoader.LoadFromFileAsync(
                        file,
                        scene,
                        (progress) => {
                            progressIndicator.value = progress * 100;
                        },
                        format,
                    );
                }

                scene.saveToFile(file.name.replace(".ply", ".splat"));
                loading = false;
            }

            document.addEventListener('dblclick',(e)=>{
                e.preventDefault();
                e.stopPropagation();

                console.log(camera.viewMatrix)
                console.log(camera.projectionMatrix)
                console.log(camera.viewProj) //变换矩阵？
                
            })


            document.addEventListener("drop", (e) => {
                e.preventDefault();
                e.stopPropagation();
        
                if (e.dataTransfer != null && e.dataTransfer.files.length > 0) {
                    selectFile(e.dataTransfer.files[0]);
                }
            });
        }

        main();

        // openViewer_3dgs(title).then(response=>{
        //     console.log(response)
            
        //     data = response.blob();
        //     console.log('1')
        //     console.log(data)
            
        // }
        // ).catch((error)=>{

        // })


        
        

    })

    

    return (
        <div>
            <div id="progress-container">
                <dialog open id="progress-dialog" >
                    <p>
                        <label htmlFor="progress-indicator">Loading scene...</label>
                    </p>
                    <progress max="100" id="progress-indicator"></progress>
                </dialog>
            </div>
        
            <canvas id="canvas" ></canvas>
        </div>
        
        
    )
};

