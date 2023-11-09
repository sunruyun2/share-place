/* allow user to update the title or description of a place */
import React, {useContext, useEffect, useState} from "react";
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import './PlaceForm.css'
import { useForm } from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const UpdatePlace = () => {
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const history = useHistory();
    const placeId = useParams().placeId;
    const auth = useContext(AuthContext);

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

    useEffect(()=>{
        const fetchPlace = async() => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/${placeId}`
                );
                setLoadedPlace(responseData.place)
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true)
            } catch (error) {}
        }
        fetchPlace();
    } ,[sendRequest,placeId,setFormData])



    if (!loadedPlace &&!error) {
        return (
        <div className="center">
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>
        )
    }

        if (isLoading) {
            return (
                <div className="center">
                    <LoadingSpinner />
                </div>
                )
        }

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }),
                {'Content-Type': 'application/json'}
            )
            
        } catch (error) {
            console.log(error)
        }

        history.push('/' + auth.userId + '/places')
    }


    
    return (<>
        <ErrorModal error={error} onClear={clearError}/>
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
    </form></>)
    
};

export default UpdatePlace;