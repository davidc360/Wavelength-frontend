import React, { useEffect, useState, useRef } from 'react'
import styles from "./Message.module.sass"

export default function ({ picture, name, message }) {
    
    return(
        <div className={styles.ctn}>
            <div className={styles.user}>
                <img src={picture} className={styles.pic}/>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.message}>{message}</div>
        </div>
    )
}