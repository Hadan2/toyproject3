import React , { useState, useEffect } from "react";
import {Button, Container, Nav, Navbar,Row,Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyNavbar() {
    const navigate = useNavigate();
    return (
            <Navbar>
                <Container>
                    <Row>
                        <Col>
                            <Button variant="contained" color="primary" className="textst"
                                onClick={() => {
                                    navigate('/home')
                                }}>
                                Todolist
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="contained" color="primary" className="textst"
                                onClick={() => {
                                    navigate('/add')
                                }}>
                                Add
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="contained" color="primary" className="textst"
                                onClick={() => {
                                    axios.get('http://localhost:8080/logout')
                                    .then(res => {
                                        alert('Logout!')
                                        sessionStorage.clear();
                                        navigate('/')
                                      })
                                      .catch(err => {
                                        console.error(err);
                                      });
                                }}>
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
    )
            
}
            

export default MyNavbar;