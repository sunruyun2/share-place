import React, { useContext } from "react";

import "./PlaceItem.css"
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import {useHttpClient} from '../../shared/hooks/http-hooks'
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = props => {
    const auth = useContext(AuthContext)
    const {isLoading, error,sendRequest, clearError} = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteHandle = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = async() => {
        setShowConfirmModal(false)
        try {
            await sendRequest(`http://localhost:5000/api/places/${props.id}`,'DELETE')
        } catch (error) {}
        props.onDelete(props.id);
    }

    return (
        <>
        <ErrorModal error= {error} onClear={clearError} />
            <Modal 
             show={showMap} 
             onCancel={closeMapHandler} 
             header = {props.address} 
             contentClass="place-item__modal-content"
             footerClass="place-item__modal-actions"
             footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinate} zoom={16}/>
                </div>
            </Modal>
            <Modal 
                show={showConfirmModal}
                onCancel={cancelDeleteHandle}
                header="Are you sure?" 
                footerClass="place-item__modal-actions" 
                    footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandle}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                    }>
                <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter.</p>
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay/> }
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>} 
                        {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </>);
}

export default PlaceItem;