import * as PANOLENS from 'panolens';
//import './styles.css';
import { useEffect, useRef } from 'react';
// var container, viewer, panorama;
const Pano = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const viewer = new PANOLENS.Viewer({ container });
    const videoPanorama = new PANOLENS.VideoPanorama('/panorama/杨浦滨江-2_1.mp4', {
      autoplay: true,
    });
    viewer.add(videoPanorama);
  }, []);
  // container = document.querySelector( '#container' );
  // panorama = new PANOLENS.VideoPanorama('/panorama/ClashofClans.mp4', {autoplay:true});

  // viewer = new PANOLENS.Viewer();
  // viewer.add(panorama);

  // TODO:音乐自动播放接口
  const playClickedImg = () => {
    let audio_player = document.getElementById('audio_player');
    if (audio_player.paused) {
      audio_player.play();
    } else {
      audio_player.pause();
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      {/* TODO:音乐自动播放接口 */}
      <div className="audioBox">
        {/* 不需要按钮则将button给注释掉 */}
        {/* <Button type="primary" onClick={playClickedImg} >    
                 播放/暂停
                 </Button> */}
        <audio id="audio_player" loop autoPlay={true}>
          <source src={require('../../../../public/mp3/music.mp3')} />
        </audio>
      </div>
    </div>
  );
};
export default Pano;
