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

const Auth = () =>{
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false
        }

    },false)


    const authSubmitHandler = async event => {
        event.preventDefault();
    
        //send http request to backend
        if (isLoginMode){

        } else {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name:formState.inputs.name.value,
                        email:formState.inputs.email.value,
                        password:formState.inputs.password.value,
                    })
                });

                const responseData = await response.json();
                console.log(responseData)
                setIsLoading(false)
                auth.login();
            } catch (e) {
                console.log(e)
                setIsLoading(false)
                setError(e.message || 'Something went wrong, please try again')
            }
        }
    }

    const switchModeHandler = () => {
        if  (!isLoginMode){
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
            },false)
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    return <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
                <Input 
                    element="input"
                    id="name"
                    type="text"
                    label="Your name"
                    validators={[VALIDATOR_REQUIRE(), ]}
                    errorText="please enter a valid name"
                    onInput={inputHandler}
                />
            )}
            <Input 
                id="email"
                element="input"
                type="email"
                label="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter valid email address"
                onInput= {inputHandler}
            />

            <Input 
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid password(at least 5 character)"
                onInput= {inputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? "LOGIN": "SIGNUP"}
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
    </Card>
}

export default Auth;