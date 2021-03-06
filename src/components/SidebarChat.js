import React, { useState } from "react";

import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { Avatar } from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';

import db from '../firebase'
import '../css/SidebarChat.css'

export default function SidebarChat({ id, name, url, addNewChat }) {
    const [show, setShow] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [imageValue, setImageValue] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createRoom = async (e) => {
        e.preventDefault();
        db.collection('rooms').add({
            name: nameValue,
            imageURL: imageValue,
        })
        setImageValue('');
        setNameValue('');
    }

    return !addNewChat ? (
        < Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={url} />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                </div>
            </div>
        </Link>
    ) : (
            <>
                <div className='sidebarChat' onClick={handleShow}>
                    <h2><AddBoxIcon /> Add New Public Chat</h2>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Room</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Room Name</Form.Label>
                                <Form.Control value={nameValue} onChange={(e) => setNameValue(e.target.value)} type="text" placeholder="Enter room name" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Room Icon</Form.Label>
                                <Form.Control value={imageValue} onChange={(e) => setImageValue(e.target.value)} type="text" placeholder="Enter Image URL" />
                            </Form.Group>
                            <Form.Text className="text-muted">
                                You are creating a community chat room.
                                Anyone using this application can view and add to it.
                            </Form.Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" type="submit" onClick={createRoom} >
                                Create Room
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        )
}