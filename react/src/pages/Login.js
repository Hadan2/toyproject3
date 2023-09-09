import React,{ useState, useEffect } from "react";
import '../App.css';
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { isPassword, isId } from "./Function";

function Login(props) {

    let [modalRegister, setModalRegister] = useState(false);
    let [modalLogin, setModalLogin] = useState(false);
    let [id, setId] = useState("");
    let [pwd, setPwd] = useState("");


    const navigate = useNavigate();

    return (
        <div className="background">
            <div style={{ fontFamily : "Oswald", fontSize: '100px', color: 'black', textAlign : "center" }} > Welcome!</div> 

            <div style={{textAlign : "center"}}>
            <button className="login-button" onClick={ () => {
              setModalRegister(false);
              setModalLogin(!modalLogin);
              
            }}>로그인</button>
            
            <button className="signup-button" onClick={ () => {
                setModalLogin(false);
                setModalRegister(!modalRegister);
              
 
            }}>회원가입</button>

            {
                modalRegister === true ? <ModalRegister 
                id = {id} 
                setId = {setId} 
                setPwd = {setPwd} 
                pwd = {pwd} />: null
                
            }
            {
                modalLogin === true ? <ModalLogin 
                id = {id} 
                setId = {setId} 
                setPwd = {setPwd} 
                pwd = {pwd} 
                setUser={props.setUser}
                
                 />: null
            }
            </div>
            
            

            
        </div>
    )
}
function ModalRegister(props){

  const navigate = useNavigate();

    return (
        <div>
            

            <div>
            <input onChange={(e) => {
              props.setId(e.target.value);
            }}
            
            placeholder="아이디"
            type="text"
          />

            </div>

            <div>
            <input onChange={(e) => {
              props.setPwd(e.target.value);
            }}
            
            placeholder="비밀번호"
            type="password"
            />
            </div>
          

          <button onClick={() => {
            //console.log(props.id)
            //console.log(props.pwd)
            if(isId(props.id)&&isPassword(props.pwd)) {
              axios.post('/info', {
                id : props.id,
                pwd : props.pwd
            })
            .then(response => {
                /* console.log('요청이 성공했습니다.');
                console.log('서버 응답 데이터:', response.data); */
                navigate('/home')

              })
              .catch(error => {
                /* console.error('요청이 실패했습니다.');
                console.error('오류:', error); */
              });
            }
            else {
              alert('아이디 혹은 비밀번호를 올바르게 입력해주세요')
            }
            
          }}> 회원가입 </button>


        

            
        </div>

        

       
    )
  }

  function ModalLogin(props){

    const navigate = useNavigate();
  
      return (
          <div>
              
  
              <div>
              <input onChange={(e) => {
                props.setId(e.target.value);
              }}
              
              placeholder="아이디"
              type="text"
            />
  
              </div>
  
              <div>
              <input onChange={(e) => {
                props.setPwd(e.target.value);
              }}
              
              placeholder="비밀번호"
              type="password"
              />
              </div>
            
  
            <button onClick={() => {
              console.log(props.id)
              console.log(props.pwd)
              axios.post('/loginServer', {
                  id : props.id,
                  pwd : props.pwd
              })
              .then((response)=>{
                if(response.data.id===props.id){
                    alert('Logined')
                    props.setUser(response.data.id)
                    sessionStorage.setItem('info',props.id)
                    navigate('/home')
                }
                else{
                    alert('fail')
                }
            })
            }}> 로그인 </button>
  
  
          
  
              
          </div>
  
          
  
         
      )
    }



export default Login;