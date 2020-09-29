import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setPicture, setShowModal } from '../../ducks/modules/chat'

import settingsIcon from './settings.png'

export default function () {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.chat.userInfo)
    const showSettingsModal = useSelector(state => state.chat.showSettingsModal)

    function updateName(e) {
        dispatch(setName(e.target.value))
    }
    function updatePicture(e) {
        dispatch(setPicture(e.target.value))
    }
    function toggleModal(e) {
        dispatch(setShowModal(!showSettingsModal))
    }

    return (
        <div>
            <img
                    src={settingsIcon}
                    style={{ width: '20px' }}
                    onClick={toggleModal}
            />
            {showSettingsModal && (
                <div>
                    <div>name: <input type="text" value={userInfo.name} onChange={updateName}/></div>
                    <div>Picture URL: <input type="text" value={userInfo.picture} onChange={updatePicture}/></div>
                </div >
            )}
        </div>
    )
}