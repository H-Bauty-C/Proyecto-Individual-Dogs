import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDogs } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from '../Styles/DogsCreate.module.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Your breed must have a name';
    }
    else if (input.name.length > 15) {
        errors.name = 'That´s way too long a name. Keep it simple!!';
    }
    else if (!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) {
        errors.height_min = 'Minimum height is required!!, only numbers';
    }
    else if (isNaN(parseInt(input.height_min))) {
        errors.height_min = 'Height should be a number';
    }
    else if (input.height_min <= 9) {
        errors.height_min = 'the smallest dog is 9.65 cm';
    }
    else if (parseInt(input.height_min) >= parseInt(input.height_max)) {
        errors.height_min = 'Minimum height should be lower than maximum height';
    }
    else if (!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) {
        errors.height_max = 'Maximum height is required!!, only numbers';
    }
    else if (isNaN(parseInt(input.height_max))) {
        errors.height_max = 'Height should be a number';
    }
    else if (input.height_max > 100) {
        errors.height_max = 'I think 100cm is enough for a dog´s height, don´t you?';
    }
    else if (!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) {
        errors.weight_min = 'Minimum weight is required!!, only numbers';
    }
    else if (isNaN(parseInt(input.weight_min))) {
        errors.weight_min = 'Weight should be a number';
    }
    else if (input.weight_min <= 0) {
        errors.weight_min = 'Your breed must weight at least more than nothingness';
    }
    else if (!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) {
        errors.weight_max = 'Maximum weight is required!!, only numbers';
    }
    else if (isNaN(parseInt(input.weight_max))) {
        errors.weight_max = 'Weight should be a number';
    }
    else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
        errors.weight_max = 'Maximum weight should be higher than minimum weight';
    }
    else if (input.weight_max > 111) {
        errors.weight_max = 'We are creating a dog, not an elephant 🐘!! Keep your weight under 111';
    }
    else if (!input.life_span || !/^[1-9]\d*(\.\d+)?$/.test(input.life_span)) {
        errors.life_span = 'Life span is required!!, only numbers';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'Life span should be a number';
    }
    else if (input.life_span > 22) {
        errors.life_span = 'Saddly, dogs don´t live that long 😥';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'You don´t want your dog to live???? 😮';
    }

    return errors;
}

export default function DogCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({//seteo el estado
            ...input,
            [e.target.name]: e.target.value,//agregale el traget a value de lo q este modificando
                                            //
        });
        // Esta función hace lo siguiente:
        // Cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, le agrega
        // el value de lo que se esté modificando. La idea es que a medida que vaya llenando los inputs
        // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

        console.log(input)
    }

    function handleSelect(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            });
            console.log(input);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);//Object.getOwnPropertyNames() devuelve un array con todas las propiedades (numerables o no) encontradas en un objeto dado.
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.height_min && input.height_max && input.weight_min && input.weight_max && input.life_span && input.temperaments.length) {
            dispatch(postDogs (input));
            alert('Doggie created 👏');
            setInput({
                name: '',
                height_min: '',
                height_max: '',
                weight_min: '',
                weight_max: '',
                life_span: '',
                image: '',
                temperaments: [],
            });
            history.push('/home');
        } else {
            alert('Doggie can´t be created with these data 🤷‍♂️')
        }
    }

    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== el)
        })
    }

    return (
        <div className={styles.background}>
            <Link to='/home'><button className={styles.button}>Home</button></Link>
            <h1 className={styles.mainTitle}>🐕 Create your own dog breed 🐶</h1>
            <form onSubmit={e => handleSubmit(e)} className={styles.formContainer}>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}><strong>Name: </strong></label>
                    <input className={styles.subInput} type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className={styles.error}><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}><strong>Minimum height: </strong></label>
                    <input className={styles.subInput} type='text' value={input.height_min} name='height_min' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.height_min && (
                        <p className={styles.error}><strong>{errors.height_min}</strong></p>
                    )}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}><strong>Maximum height: </strong></label>
                    <input className={styles.subInput} type='text' value={input.height_max} name='height_max' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.height_max && (
                        <p className={styles.error}><strong>{errors.height_max}</strong></p>
                    )}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}><strong>Minimum weight: </strong></label>
                    <input className={styles.subInput} type='text' value={input.weight_min} name='weight_min' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weight_min && (
                        <p className={styles.error}><strong>{errors.weight_min}</strong></p>
                    )}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}><strong>Maximum weight: </strong></label>
                    <input className={styles.subInput} type='text' value={input.weight_max} name='weight_max' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weight_max && (
                        <p className={styles.error}><strong>{errors.weight_max}</strong></p>
                    )}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}><strong>Expected life span: </strong></label>
                    <input className={styles.subInput} type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                    <label><strong> years</strong></label>
                    {errors.life_span && (
                        <p className={styles.error}><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}><strong>Image: </strong></label>
                    <input className={styles.subInput} type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                </div>
                <div className={styles.subContainer}>
                    <select className={styles.select} onChange={e => handleSelect(e)} >
                        <option value='selected' hidden >Temperaments</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>

                    {input.temperaments.map(el => {
                        return (
                            
                                <ul className={styles.diets} key={el}>
                                    <li>
                                        <div className={styles.selectedDiets}>
                                        <p><strong>{el}</strong></p>
                                        <button className={styles.crossButton} onClick={() => handleDeleteTemperament(el)} >X</button>
                                        </div>
                                    </li>
                                </ul>
                            
                        )
                    })}

                </div>
                <button className={styles.submitButton} type='submit'><strong>Boop</strong></button>

            </form>

        </div>
    )
}