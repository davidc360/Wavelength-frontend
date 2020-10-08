import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVideoLink } from '../../ducks/modules/session'

export default function () {
    const dispatch = useDispatch()
    const { token, link, socket } = useSelector(state => state.session)

    function updateLink(e) {
        const newLink = e.target.value
        dispatch(setVideoLink(newLink))
        socket.emit('update_link', {
            room: token,
            link: newLink
        })
    }

    return(
        <div style={{color: 'white'}}>
            <div>
                Token: <input type="text" value={token} readOnly/>
            </div>
            <div>
                Link: <input type="text" value={link} onChange={updateLink}/>
            </div>
        </div>
    )
}