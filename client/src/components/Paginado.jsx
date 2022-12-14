import React from "react";
import styles from '../Styles/Paginado.module.css'

export default function Paginado ({
    dogsPerPage, 
    allDogs, 
    //dispatch,
    paginado,
    //setcurrentPage,
    //currentPage,
    //currentDogs
}){
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className={styles.barra}>
                {pageNumbers && 
                pageNumbers.map(number =>(
                    <li key={number}>
                    <a onClick={ () => paginado(number)}> {number} </a>
                    {/* <button onClick={()=> paginado(number)}><strong>{number}</strong></button> */}
                    </li>
                ))}
            </ul>
        </nav>
    )
}