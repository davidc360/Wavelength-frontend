import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import YouTube from 'react-youtube'
import getYouTubeID from 'get-youtube-id'

import styles from "./YouTubePlayer.module.sass"

export default function () {
    const { token, socket, playState, timestamp } = useSelector(state => state.session)
    const videoLink = useSelector(state => state.session.link)
    const player = useRef()

    const id = getYouTubeID(videoLink)

    const opts = {
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }
    
    function setPlayer(event) {
        player.current = event.target
        player.current.seekTo(10.1)
    }

    function setPlay(e) {
        console.log('played')
        if(!playState)
        socket.emit('play_video', {
            room: token,
            timestamp: player.current.getCurrentTime(),
            actionTime: Date.now()
        })
    }
    
    function setPause(e) {
        console.log('paused')
        if(playState)
        socket.emit('pause_video', {
            room: token
        })
    }

    useEffect(() => {
        console.log('play state changed')
        if (!player.current) return
        if (playState)
        player.current.playVideo()
        else
        player.current.pauseVideo()
    }, [playState])
    
    useEffect(() => {
        if (!player.current) return
        player.current.seekTo(timestamp)
    }, [timestamp])

    return(
        <YouTube
            videoId={id}
            opts={opts}
            className={styles.player}
            onReady={setPlayer}
            onPlay={setPlay}
            onPause={setPause}
        />
    )
}