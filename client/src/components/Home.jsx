import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterDogsbyTemperament, filterCreated, ordenName, weigth } from '../actions/index';
import { Link } from 'react-router-dom';
import styles from '../Styles/Home.module.css'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)
    const [/* orden */, setOrden] = useState('')

    const [currentPage, setcurrentPage] = useState(1)
    const [dogsPerPage, /* setDogsPerPage */] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setcurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs())
        setcurrentPage(1)
    }

    function handleFilterTemp(e){
        e.preventDefault()
        setcurrentPage(1);
        dispatch(filterDogsbyTemperament(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    function handleOrderName(e){
        e.preventDefault();
        dispatch(ordenName(e.target.value))
        setcurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)//me podifica el estado actual y se renderiza
    }

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(weigth(e.target.value));
        setcurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div className={styles.background}>
            <h1 className={styles.homeTitle}>All dogs</h1>
            <div className={styles.firstContainer}>
            <Link to= '/dogs'>
                <button className={styles.button}>Create Dog</button>
            </Link>
            <button className={styles.buton} onClick={e=>{handleClick(e)}}>
            Reload all dogs
            </button>
            </div>
            <div className={styles.searchBar}>
                <SearchBar/>
            </div>
            <div className={styles.secondContainer}>
                <select className={styles.filter} onChange={e => handleOrderName(e)}>
                    <option value= 'all'>Sort breeds by name</option>
                    <option value= 'asc'>A - Z</option>
                    <option value= 'desc'>Z - A</option>
                </select>
                <select className={styles.filter} onChange={e => handleFilterCreated(e)}>
                    <option value= 'all'>All breeds</option>
                    <option value= 'api'>Existent breeds</option>
                    <option value= 'created'>Created breeds</option>
                </select>
                <select className={styles.filter} onChange={e => handleSortByWeight(e)}>
                    <option value='all'>Sort by weight</option>
                    <option value='asc'>Lighter to heavier</option>
                    <option value='desc'>Heavier to lighter</option>
                </select>
                <select className={styles.filter} onChange={e => handleFilterTemp(e)}>
                            <option key={0} value='all'>All temperaments</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            }).map(el => {
                                return (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                </div>
                <div className={styles.recipeContainer}>
                {
                        currentDogs?.map((el) => {
                        return (
                            <div key={el.id}>
                                <Link to={'/home/' + el.id} style={{ textDecoration: 'none' }} >
                                    <Card
                                        name={el.name}
                                        image={el.image}
                                        temperaments={el.temperaments}
                                        weight_min={el.weight_min}
                                        weight_max={el.weight_max}
                                        key={el.id}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.paginadoContainer}>
            <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            />
            </div>
            <div className={styles.nashe}>
                <p className={styles.nashe2}>Henry Dogs</p>
                <p className={styles.nashe3}>Hugo Ceci ©Copyright 2022 All rights reserved</p>
            </div>
        </div>
    )
}