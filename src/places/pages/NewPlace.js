import React from "react";

import './NewPlace.css'
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";

const NewPlace = () => {
    return <form className="place-form">
        <Input type="text"
            label="Title"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid title" />
    </form>
}

export default NewPlace;