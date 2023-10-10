import React from "react";

import './PlaceForm.css'
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hooks";


const NewPlace = () => {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },false);

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); //send this to a back-end later
    }

    
    return <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
            id="title" 
            label="Title"
            type="text"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid title"
            onInput = {inputHandler} />

        <Input
            id = "description" 
            label="Description"
            element="textarea"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="please enter a valid description (at least 5 character)"
            onInput = {inputHandler} />

        <Input
            id = "address" 
            label="Address"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid address"
            onInput = {inputHandler} />    
            

        <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
        </Button>
    </form>
}

export default NewPlace;