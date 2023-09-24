import React from "react";
import { useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../components/AuthForm";
import img from './Welcome.gif'


function Register (){
  const navegate = useNavigate();

  const handleNewUser = async (email,senha,auth) =>{
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      localStorage.setItem("userid",userCredential.user.uid)
      console.log(userCredential)
     })
    .catch((error) => {
      console.log(error.message);
     });
    
    if(auth.currentUser){
        navegate('/tasks')
    }
}

    return (
      <section className="main-Login">
          <img  className= "login-img"src={img}/>
          <AuthForm Titulo={"Cadastro"} Submit={handleNewUser} Register={true}/>
      </section>
    );
  }

export default Register;