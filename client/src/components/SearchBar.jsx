import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import styles from '../Styles/SearchBar.module.css'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    
    function handleImputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDogs(name))
        setName('');
    }

    return(
        <div className={styles.container}>
            <input className={styles.textBox}
            type = 'text'
            placeholder = 'Search by breed...'
            onChange={(e)=> handleImputChange(e)}
            value={name}
            onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button className={styles.button} type='submit' onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}