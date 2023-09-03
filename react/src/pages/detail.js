import React , { useState, useEffect } from "react";
import {Button, Container, Nav, Navbar,Row,Col} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from "./navbar";

function Detail(props) {
    const {id} = useParams();
    const nowData = props.data1.find(item => item._id.toString() == id)

    return (
            <div>

            <MyNavbar></MyNavbar>

            <Container>
                <div className="sqaure">

                    <div className="textst" style={{ marginTop: 20 }}> {nowData.title} </div>
                        

                    <div className="textst" style={{ marginTop: 20 }}>{nowData.content}</div>
                        

                     
                </div>
                    
                

            </Container> 

            </div>

               
    )
}

export default Detail;