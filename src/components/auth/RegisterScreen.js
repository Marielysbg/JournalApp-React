import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui);


    const [values, handleInputChance] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = values;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid() ) {
            dispatch(startRegisterWithEmailPasswordName( email, password, name));
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0){
            dispatch(setError('name is required'));
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch(setError('email is not valid'));
            return false;
        } else if ( password !== password2 || password.length < 5) {
            dispatch(setError('password should be at least 6 characters and match each other'));
            return false;
        }
        
        dispatch(removeError())
        return true;
    }

    return (
        <>
            <h3 className = "auth__title">Register</h3>

            <form 
                onSubmit = { handleRegister }
                className = "animate__animated animate__fadeIn animate__faster"
                
            >

               {
                    (
                        msgError &&
                    <div className = "auth__alert-error">
                      {msgError}
                    </div>
                    )
                
                }

            <input
                type = 'text'
                placeholder = 'Name'
                autoComplete = 'off'
                name = 'name'
                className = "auth__input"
                value = { name }
                onChange = { handleInputChance }
            />

            <input
                type = 'text'
                placeholder = 'Email'
                autoComplete = 'off'
                name = 'email'
                className = "auth__input"
                value = { email }
                onChange = { handleInputChance }
            />

            <input
                type = 'password'
                placeholder = 'Password'
                name = 'password'
                className = "auth__input"
                value = { password }
                onChange = { handleInputChance }
            />

            <input
                type = 'password'
                placeholder = 'Confirm password'
                name = 'password2'
                className = "auth__input"
                value = { password2 }
                onChange = { handleInputChance }
            />

            <button
                type = 'submit'
                className = "btn btn-primary btn-block mb-5"
            >
                Register
            </button>

           <Link 
            to = "/auth/login"
            className = "link"
            >
                Already registered?
           </Link>

            </form>
        </>
    )
}
