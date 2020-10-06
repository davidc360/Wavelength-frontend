import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import YouTube from 'react-youtube'
import getYouTubeID from 'get-youtube-id'

import styles from "./YouTubePlayer.module.sass"

export default function () {
    const { token, socket, playState, timestamp, timestampLastChanged, sendTimestamp } = useSelector(state => state.session)
    const videoLink = useSelector(state => state.session.link)
    const player = useRef()

    const id = getYouTubeID(videoLink)

    const firstRun = useRef(true)

    const opts = {
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }
    
    function setPlayer(event) {
        player.current = event.target
        player.current.seekTo(timestamp)
    }

    function setPlay(e) {
        if (!firstRun.current) {
            console.log(Date.now() - timestampLastChanged > 500)
            if (Date.now() - timestampLastChanged > 1000) {
                socket.emit('play_video', {
                    room: token,
                    timestamp: player.current.getCurrentTime(),
                })
            }
        } else {
            firstRun.current = false
        }
    }
    
    function setPause(e) {
        socket.emit('pause_video', {
            room: token
        })
        console.log('paused vid')   
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
    
    useEffect(() => {
        if (!player.current) return
        console.log('somebody requested the timestamp')
        socket.emit('update_timestamp', {
            timestamp: player.current.getCurrentTime(),
            room: token
        })
    }, [sendTimestamp])

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