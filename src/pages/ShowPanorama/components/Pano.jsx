import * as PANOLENS from 'panolens';
import { Space } from 'antd';

var container, viewer, panorama;
const Pano = () => {
    
    panorama = new PANOLENS.ImagePanorama('https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg');
    //panorama = new PANOLENS.ImagePanorama(process.env.PUIC_URL+'/panorama/1.png')
    viewer = new PANOLENS.Viewer({container: container});
    viewer.add(panorama);

    return(
        
        <div  id="container" ></div>
        
        
    )
}
export default Pano;

