import * as PANOLENS from 'panolens';
//import './styles.css';
import React, {useEffect, useRef } from 'react';
// var container, viewer, panorama;
const Pano = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        const viewer = new PANOLENS.Viewer({container})
        const videoPanorama = new PANOLENS.VideoPanorama('/panorama/杨浦滨江-2_1.mp4', {autoplay:true})
        viewer.add(videoPanorama);
    },[])
    // container = document.querySelector( '#container' );
    // panorama = new PANOLENS.VideoPanorama('/panorama/ClashofClans.mp4', {autoplay:true});
    
    
    // viewer = new PANOLENS.Viewer();
    // viewer.add(panorama);
    
    return(
        
        <div  ref={containerRef} style={{position: 'absolute', top: 0,bottom:0,left:0,right:0}}></div>
        
        
    )
}
export default Pano;

