import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import './Auth.css'
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";


const Auth = () =>{
    const [isLoginMode, setIsLoginMode] = useState(true)
    
    
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


    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
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