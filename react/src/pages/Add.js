import React , { useState, useEffect } from "react";
import {Button, Container, Nav, Navbar,Row,Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from "./navbar";

import { isDate, isTitle } from "./Function";

function Add(props) {
    const navigate = useNavigate();

    let [title, setTitle] = useState("");
    let [date, setDate] = useState("");
    let [content, setContent] = useState("");


    return (
        <div>
            <MyNavbar></MyNavbar>

            <Container>
                <div className="sqaure">

                    <div className="textst" style={{ marginTop: 20 }}> Title </div>
                        <input
                            className="input-field"
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            placeholder="Title"
                            type="text"
                        />

                        <input
                            className="input-field"
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                            placeholder="Date"
                            type="text"
                        />

                    <div className="textst" style={{ marginTop: 20 }}>Content</div>
                        <textarea
                            className="textarea-field"
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                            placeholder="Please enter the content"
                        ></textarea>

                        <Button className="add-button" style={{marginTop:20, color: "Dark"}} 
                        onClick={() => {
                            if(isDate(date)&&isTitle(title)) {
                              axios.post('http://localhost:8080/data2', {
                                title : title,
                                content : content,
                                date : date,
                                writer: props.user
                                
                            })
                            .then(response => {
                                navigate('/home')

                            })
                            .catch(error => {
                            });  
                            }
                            else {
                                alert('날짜와 타이틀을 올바르게 입력했는지 확인해주세요')
                            }
                            
                                    }}>
                            Add
                        </Button>
                    </div>

                    
                

            </Container>



           
        </div>
    )
}

export default Add;