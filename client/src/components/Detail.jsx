import React from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteDetails } from "../actions";
import { useEffect } from "react";
import styles from '../Styles/Detail.module.css'
import Loading from "../components/Loading"

export default function Detail(props){
    const dispatch = useDispatch();

    const id = props.match.params.id

    useEffect(()=>{
        dispatch(getDetail(id));
        return () => dispatch(deleteDetails())
    }, [dispatch, id])

    const myDog = useSelector((state)=> state.detail)

    return(
        <div className={styles.container}>
            {
                myDog.length > 0 ?
                    <div className={styles.box}>
            <Link to='/home'><button className={styles.button}>Home</button></Link>
            <Link to='/dogs'>
                <button className={styles.button}>
                    Create dogs
                </button>
            </Link>
                        <h1 className={styles.mainTitle}>{myDog[0].name}</h1>
                        <ul className={styles.list}>
                            <li>
                                <div>
                                    <img className={styles.image} src={myDog[0].image} alt={myDog[0].name}/>
                                </div>
                            </li>
                            <li>
                                <div className={styles.box}>
                                    <h4 className={styles.subTitle}>Temperaments:</h4>
                                    <ul className={styles.info2}>
                                    {myDog[0].createdInDb ?
                                            myDog[0].temperaments.map(el => {
                                                return <li key={el}><label>{el.name}</label></li>
                                            }) :
                                            myDog[0].temperaments ?
                                                myDog[0].temperaments.split(', ').map(el => {
                                                    return <li key={el}><label>{el}</label></li>
                                                }) :
                                                '🤷‍♂️ No temperaments provided for this breed 🤷‍♀️'}
                                    </ul>
                                    <h4 className={styles.subTitle}>Height</h4>
                                    <p className={styles.info}>{myDog[0].height_min} - {myDog[0].height_max} cm</p>
                                    <h4 className={styles.subTitle}>Weight</h4>
                                    <p className={styles.info}>{myDog[0].weight_min} - {myDog[0].weight_max} kg</p>
                                    <h4 className={styles.subTitle}>Origin:</h4>
                                    <p className={styles.info}>{myDog[0].origin} - {myDog[0].origin}</p>
                                    <h4 className={styles.subTitle}>Life span</h4>
                                    <p className={styles.info}>{myDog[0].life_span}</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div>
                        <h1><strong><Loading></Loading></strong></h1>
                    </div>
            }
        </div>
    )
}