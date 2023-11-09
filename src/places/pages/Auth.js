import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import './Auth.css'
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {useHttpClient} from '../../shared/hooks/http-hooks'
import ImageUpload from "../../shared/components/FormElements/ImageUpload";


const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const {isLoading, error, sendRequest, clearError} =  useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false
        }
        
    }, false)
    
    
    const authSubmitHandler = async event => {
        event.preventDefault();
        
        //send http request to backend
        if (isLoginMode) {
            try {
                    const responseData = await sendRequest('http://localhost:5000/api/users/login', 
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'application/json',
                    },
                );
                auth.login(responseData.user.id);
            } catch (e) {
                
            }

        } else {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'application/json',
                    },    
                );
                auth.login(responseData.user.id);
            } catch (e) {

            }
        }
    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    return (
        <>
            <ErrorModal error= {error} onClear= {clearError}/>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your name"
                            validators={[VALIDATOR_REQUIRE(),]}
                            errorText="please enter a valid name"
                            onInput={inputHandler}
                        />
                    )}
                    {!isLoginMode && <ImageUpload center id="image"/>}
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter valid email address"
                        onInput={inputHandler}
                    />

                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter valid password(at least 6 character)"
                        onInput={inputHandler}
                    />

                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? "LOGIN" : "SIGNUP"}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
                </Button>
            </Card>
        </>)
}

export default Auth;