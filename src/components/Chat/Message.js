import React, { useEffect, useState, useRef } from 'react'
import styles from "./Message.module.sass"

export default function ({ photo_url, username, message }) {
    
    return(
        <div className={styles.ctn}>
            <div className={styles.user}>
                <img src={photo_url} className={styles.pic}/>
                <div className={styles.name}>{username}</div>
            </div>
            <div className={styles.message}>{message}</div>
        </div>
    )
}