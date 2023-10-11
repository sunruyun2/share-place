/* allow user to update the title or description of a place */
import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import './PlaceForm.css'
import { useForm } from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";

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
        title:'Emp.',
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
    const [isLoading, setIsLoading] = useState(true);

    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm( {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    } , true)



    // adjust the form-hook initialization so that to solve the problem that
    // the data is fetched after the component is rendered
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    useEffect(()=>{
        if (identifiedPlace){
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true)
            setIsLoading(false)
        }
    },[setFormData, identifiedPlace])

    if (!identifiedPlace) {
        return (
        <div className="center">
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>
        )
    }

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState)
    }

    //fix the problem here later by replacing it with a real loading state
    if (isLoading) {
        return (
            <div className="center">
                <h2>LOADING...</h2>
            </div>
            )
    }
    
    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
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
    </form>)
    
};

export default UpdatePlace;