import React, { useEffect, useRef } from 'react'
import videojs from 'video.js';
import video from '../../vid.mp4'
import styles from "./VideoPlayer.module.sass"

export default function () {
    const player = useRef()
    React.useEffect(() => {
        player.current = videojs(videoNode.current, {
            // autoplay: true,
            controls: false,
            sources: [{
                src: video,
                type: 'video/mp4'
            }],
            // fluid: true,
        }, function () {
            console.log('video player loaded')
        })
        
        setTimeout(() => {
            player.current.currentTime(9)
        })
        setTimeout(() => {
            console.log(player.current.currentTime())
        }, 3000)
    })

    function handleClick() {
        if (player.current.paused()) {
            player.current.play();
        }
        else {
            player.current.pause();
        }
    }
        
    const videoNode = useRef()
    return (
        <div className={styles.ctn}>
          <div data-vjs-player>
              <video
                  ref={videoNode}
                  className={styles.player}
                  onClick={handleClick}
                  ></video>
          </div>
      </div>
  )
}