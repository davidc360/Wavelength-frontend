import React, { useEffect, useState, useRef } from 'react'
import styles from "./Home.module.sass"

export default function () {
    const codeRef = useRef()
    function join() {
        const code = codeRef.current.value
        window.open("/" + code,"_self") 
    }
    
    return(
        <div className={styles.ctn}>
            <button className={styles.create}>Create Room</button>
            <div className={styles.join}>
                <input type="text" className={styles.code} ref={codeRef}/>
                <button className={styles.joinButton} onClick={join}>Join</button>
            </div>
        </div>
    )
}