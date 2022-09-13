import React from "react";
import styles from "../Styles/Loading.module.css"

export default function Loading(){
    return (
        <div className={styles.container}>
            <p className={styles.loading}>Loading ...</p>
        </div> 
    )
}