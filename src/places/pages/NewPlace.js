import React, {useCallback, useReducer} from "react";

import './NewPlace.css'
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs){
                if (inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {value: action.value , isValid: action.isValid}
                },
                isValid: formIsValid
            };

        default:
            return state;
    }
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false,
    });

    const InputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id,
        })
    }, [])

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); //send this to a back-end later
    }

    
    return <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
            id="title" 
            label="Title"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid title"
            onInput = {InputHandler} />

        <Input
            id = "description" 
            label="Description"
            element="textarea"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="please enter a valid description (at least 5 character)"
            onInput = {InputHandler} />

        <Input
            id = "address" 
            label="Address"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid address"
            onInput = {InputHandler} />    
            

        <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
        </Button>
    </form>
}

export default NewPlace;