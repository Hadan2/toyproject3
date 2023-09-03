import React, { useState, useEffect }from "react";
import {Button, Container, Nav, Navbar,Row,Col} from 'react-bootstrap'
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import MyNavbar from "./navbar";

function Home(props) {
    const navigate = useNavigate();
    const params = useParams();

    const fetchData = () => {
      axios.get('http://localhost:8080/data2') 
          .then(res => {
            let copy = [...res.data]
            props.setData1(copy);
            console.log(props.data1); 
          })
          .catch(err => {
            console.error(err);
          });
    }

    const handleComplete = (id) => {
        console.log('버튼 눌렀네요')
        axios.post(`http://localhost:8080/modify/${id}`, {
            user: props.user
          })
          .then((response) => {
            fetchData();
            console.log(response)
            console.log('뭐하냐?')
          })
          .catch((error) => {
            console.log('에휴')
            alert('이건 니 포스트가 아님')
            console.log(error);
          });
      };

      const handleDelete = (id,i) => {
        axios.delete(`http://localhost:8080/delete/${id}`,{
            data: {
                user:props.user
              }
        })
            .then(response => {
            let copy2 = [...props.data1]
            copy2.splice(i,1)
            props.setData1(copy2)
            console.log(response);
            })
            .catch(error => {  
            alert("이건 니 포스트가 아니다")            
            console.error(error);
            })
      };


    useEffect(() => {
        fetchData();
      }, []);

      



    return (
        
        <div>
            <MyNavbar></MyNavbar>
            
            <div className="large-square">


            <div className="large-square1">
            {
                props.data1.map( (a,i) => {
                    let x = a._id.toString()

                    if(a.complete == false) {
                    return (
                                <div className="small-square textst" key={a._id}>

                                <div className=" textst" onClick={() => {
                                }}>{a.date}</div>

                                <Link to={`/detail/${x}`} className="textst">{a.title}</Link>

                                <div className="button-container">

                                <Button className="bottom-right-completed" onClick={() => {
                                    handleComplete(a._id)
                                }}> Complete! </Button>

                                <Button className="bottom-right-delete" variant="danger" 
                                onClick={(e) => {
                                    if(window.confirm('정말 삭제하시겠습니까?')) {
                                        handleDelete(a._id,i)
                                    }
                                    
                                }}
                                > Delete </Button> 
                                
                                </div>

                                </div>
                         
                    )}})
            }
            </div>    
                
            <div className="large-square2 textst">
            <div> {props.user}'s Completed Todolist</div>
            {
               props.data1.map((a,i) => {

                        if(a.complete==true) {
                            return (
                            
                                <div className="small-square2 textst" key={a.id} >  {a.date}   {a.title} 

                                <div className="button-container">

                                <Button className="bottom-right-delete" variant="danger" 
                                style={{ display: 'inline', marginLeft: 300, marginTop:-5}} 
                                onClick={(e) => {
                                    if(window.confirm('정말 삭제하시겠습니까?')) {
                                        handleDelete(a._id,i)
                                    }
                                }}
                                > Delete </Button>

                                </div>
                                
                                </div>

                            
                                )
                            }
                        })
                    
            }
            </div>
                    

                

            

           </div> 
            
            
           
        </div>
    )
}

export default Home;