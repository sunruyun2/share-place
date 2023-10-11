import React from "react";

import Card from "../../shared/components/UIElements/Card";
import './Auth.css'
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";


const Auth = () =>{

    
    const [formState, inputHandler] = useForm({
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
        
    }

    return <Card className="authentication">
        <h2>Login Required</h2>
        <form onSubmit={authSubmitHandler}>
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

            <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO SIGNUP</Button>
    </Card>
}

export default Auth;