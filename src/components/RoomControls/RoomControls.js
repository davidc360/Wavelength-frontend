import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLink } from '../../ducks/modules/session'

export default function () {
    const dispatch = useDispatch()
    const { token, link } = useSelector(state => state.session)

    function updateLink(e) {
        dispatch(setLink(e.target.value))
    }


    return(
        <div style={{color: 'white'}}>
            <div>
                Token: <input type="text" value={token} />
            </div>
            <div>
                Link: <input type="text" value={link} onChange={updateLink}/>
            </div>
        </div>
    )
}