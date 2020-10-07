import React, { useEffect, useState, useRef } from 'react'
import styles from "./Home.module.sass"

import axios from 'axios'
import shortid from 'shortid'

// const CREATE_ENDPOINT = 'http://50.116.0.53/create'
const CREATE_ENDPOINT = 'http://127.0.0.1:8000/'

export default function () {
    const codeRef = useRef()
    function join() {
        const token = codeRef.current.value
        window.open("/" + token, "_self") 
    }
    
    function createToken() {
        // const config = {
        //     headers: {'Access-Control-Allow-Origin': '*'}
        // }
        // axios.get(CREATE_ENDPOINT, config).then(resp => {
        //     const token = resp.data
        //     console.log(resp.data);
        //     window.open("/" + token, "_self") 
        // })
        return shortid.generate()
    }
    
    return(
        <div className={styles.ctn}>
            <button className={styles.create} onClick={createToken}>Create Room</button>
            <div className={styles.join}>
                <input type="text" className={styles.code} ref={codeRef} />
                <button className={styles.joinButton} onClick={join}>Join</button>
            </div>
        </div>
    )
}