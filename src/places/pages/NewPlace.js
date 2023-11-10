import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import './PlaceForm.css'
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from '../../shared/hooks/http-hooks'
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";


const NewPlace = () => {
    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            },
            image: {
                value: null,
                isValid: false
            }
        }, false);
    
    const history = useHistory();

    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value)
            formData.append('description', formState.inputs.description.value)
            formData.append('address', formState.inputs.address.value)
            formData.append('creator', auth.userId)
            formData.append('image', formState.inputs.image.value)
            await sendRequest('http://localhost:5000/api/places', 'POST', 
                formData
            )
            history.push('/');
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay /> }
                <Input
                    id="title"
                    label="Title"
                    type="text"
                    element="input"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a valid title"
                    onInput={inputHandler} />

                <Input
                    id="description"
                    label="Description"
                    element="textarea"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                    errorText="please enter a valid description (at least 5 character)"
                    onInput={inputHandler} />

                <Input
                    id="address"
                    label="Address"
                    element="input"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a valid address"
                    onInput={inputHandler} />

                <ImageUpload id='image' onInput={inputHandler} 
                    errorText='please provide an image' />

                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </>)
}

export default NewPlace;