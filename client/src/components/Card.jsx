import React from "react";
import styles from '../Styles/Card.module.css'

export default function Card({ image, name, temperaments, weight_min, weight_max }) {
    return (
        <div className={styles.mainContainer} >
            <h1 className={styles.title} >{name}</h1>
            <img src={image} alt={`${name}`} className={styles.image}/>
            <h3 className={styles.diets}>{function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments;
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperaments)}
            </h3>
            <h3 className={styles.diets}>Weight: {weight_min} - {weight_max} kg</h3>
        </div>
    )
}


/* export default function Card({name, image, temperament, weight_min, weight_max}){
    <div>
        <h3>{name}</h3>
        <img src={image} alt='not found' width='200px' height='250px' />
        <h5>{temperament}</h5>
        <h5>{weight_min}</h5>
        <h5>{weight_max}</h5>
    </div>
} */