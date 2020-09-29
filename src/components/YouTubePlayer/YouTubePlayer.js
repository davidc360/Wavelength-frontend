import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import YouTube from 'react-youtube'
import getYouTubeID from 'get-youtube-id'

import styles from "./YouTubePlayer.module.sass"

export default function () {
    const videoLink = useSelector(state => state.session.link)

    const id = getYouTubeID(videoLink)

    const opts = {
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      }

    return(
        <YouTube
            videoId={id}
            opts={opts}
            className={styles.player}
        />
    )
}