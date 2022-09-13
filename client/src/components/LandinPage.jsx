import React from "react";
import {Link} from 'react-router-dom';
import styles from '../Styles/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={styles.background}>
            <h1 className={styles.apiTitle}>Dog information book</h1>
            <Link to = '/home'>
                <button className={styles.button}>Get stardet!</button>
            </Link>
        </div>
    )
}