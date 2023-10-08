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
                input: {
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

    
    return <form className="place-form">
        <Input
            id="title" 
            type="text"
            label="Title"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid title"
            onInput = {InputHandler} />

        <Input
            id = "description" 
            type="text"
            label="Description"
            element="input"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="please enter a valid description (at least 5 character)"
            onInput = {InputHandler} />

        <Button type="submit" disable={!formState.isValid}>
            ADD PLACE
        </Button>
    </form>
}

export default NewPlace;