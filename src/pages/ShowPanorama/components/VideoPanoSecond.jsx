import * as PANOLENS from 'panolens';
//import './styles.css';
import { useEffect, useRef } from 'react';
// var container, viewer, panorama;
const Pano = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const viewer = new PANOLENS.Viewer({ container });
    const panorama1 = new PANOLENS.VideoPanorama('/panorama/养老家园-沙盘.mp4', {
      autoplay: true,
    });
    // viewer.add(videoPanorama);

    var Left,Right;                          

// container = document.querySelector( '#container' );

// panorama = new PANOLENS.ImagePanorama( 'https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg' );
const panorama2 = new PANOLENS.VideoPanorama('/panorama/养老家园-疗养室1.mp4', {
  autoplay: true,
});
const panorama3 = new PANOLENS.VideoPanorama('/panorama/养老家园-疗养室2.mp4', {
  autoplay: true,
});
const panorama4 = new PANOLENS.VideoPanorama('/panorama/养老家园-疗养室3.mp4', {
  autoplay: true,
});
const panorama5 = new PANOLENS.VideoPanorama('/panorama/杨浦滨江-3.mp4', {
  autoplay: true,
});
var panoramas=[panorama1,panorama2,panorama3,panorama4,panorama5];
// for (var i = 0; i < 5; i++) {
//   var infospot = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
//   infospot.position.set( -5000, 0, -5000 );
//   infospot.addHoverText( "下一场景" );
//   infospot.addEventListener( 'click', function(){
//     viewer.setPanorama( panoramas[i==4?0:i+1] );
//   } );
//   panoramas[i].add( infospot );
//   // 上一场景
//   var infospot = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
//   infospot.position.set( 5000, 0, -5000 );
//   infospot.addHoverText( "上一场景" );
//   infospot.addEventListener( 'click', function(){
//     viewer.setPanorama( panoramas[i==0?4:i-1] );
//   }
//   );
//   panoramas[i].add( infospot );
  
// }
var infospot1 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot1.position.set( -5000, 0, -5000 );
infospot1.addHoverText( "下一场景" );
infospot1.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[1] );
} );
panoramas[0].add( infospot1 );
// 上一场景

var infospot2 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot2.position.set( 5000, 0, -5000 );
infospot2.addHoverText( "上一场景" );
infospot2.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[4] );
}
);
panoramas[0].add( infospot2 );
// 下一场景

var infospot3 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot3.position.set( -5000, 0, -5000 );
infospot3.addHoverText( "下一场景" );
infospot3.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[2] );
}
);
panoramas[1].add( infospot3 );
// 上一场景

var infospot4 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot4.position.set( 5000, 0, -5000 );
infospot4.addHoverText( "上一场景" );
infospot4.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[0] );
}
);
panoramas[1].add( infospot4 );
// 下一场景

var infospot5 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot5.position.set( -5000, 0, -5000 );
infospot5.addHoverText( "下一场景" );
infospot5.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[3] );
}
);
panoramas[2].add( infospot5 );
// 上一场景

var infospot6 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot6.position.set( 5000, 0, -5000 );
infospot6.addHoverText( "上一场景" );
infospot6.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[1] );
}
);
panoramas[2].add( infospot6 );
// 下一场景

var infospot7 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot7.position.set( -5000, 0, -5000 );
infospot7.addHoverText( "下一场景" );
infospot7.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[4] );
}
);
panoramas[3].add( infospot7 );
// 上一场景

var infospot8 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot8.position.set( 5000, 0, -5000 );
infospot8.addHoverText( "上一场景" );
infospot8.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[2] );
}
);
panoramas[3].add( infospot8 );
// 下一场景

var infospot9 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot9.position.set( -5000, 0, -5000 );
infospot9.addHoverText( "下一场景" );
infospot9.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[0] );
}
);
panoramas[4].add( infospot9 );
// 上一场景

var infospot10 = new PANOLENS.Infospot( 500, PANOLENS.DataImage.Info );
infospot10.position.set( 5000, 0, -5000 );
infospot10.addHoverText( "上一场景" );
infospot10.addEventListener( 'click', function(){
  viewer.setPanorama( panoramas[3] );
}
);
panoramas[4].add( infospot10 );

viewer.add( panoramas[0],panoramas[1],panoramas[2],panoramas[3],panoramas[4] );



// viewer = new PANOLENS.Viewer( { container: container } );

viewer.addUpdateCallback(function(){
  
});
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
