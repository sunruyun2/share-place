/* allow user to update the title or description of a place */
import React from "react";
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import './PlaceForm.css'
import { useForm } from "../../shared/hooks/form-hooks";

const DUMMY_PLACES = [
    {
        id:'p1',
        title:'Empire State Building',
        description: 'One of the greatest sky scrapers in the world!',
        imageUrl: 'https://images.pexels.com/photos/2019546/pexels-photo-2019546.jpeg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat:40.7484445,
            lng:-73.9882393,
        },
        creator: 'u1'
    },
    {
        id:'p2',
        title:'Empire State Building',
        description: 'One of the greatest sky scrapers in the world!',
        imageUrl: 'https://images.pexels.com/photos/2019546/pexels-photo-2019546.jpeg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat:40.7484445,
            lng:-73.9882393,
        },
        creator: 'u2',
    },
]



const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    const [formState, inputHandler] = useForm( {
        title: {
            value: identifiedPlace.title,
            isValid: true
        },
        description: {
            value: identifiedPlace.description,
            isValid: true
        }
    } , true)

    if (!identifiedPlace) {
        return (
        <div className="center">
            <h2>Could not find place!</h2>
        </div>
        )
    }

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState)
    }

    return <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input 
            id="title" 
            element="input"
            type="text"
            label="Title"
            validators = {[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput= {inputHandler}
            initialValue={formState.inputs.title.value}
            initialValidity={formState.inputs.title.isValid} 
        />

        <Input 
            id="description" 
            element="textarea"
            label="Description"
            validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput= {inputHandler}
            initialValue={formState.inputs.description.value}
            initialValidity={formState.inputs.description.isValid} 
        />
        
        <Button type="submit" disabled= {!formState.isValid}>
            UPDATE PLACE
        </Button>


    </form>
    
};

export default UpdatePlace;