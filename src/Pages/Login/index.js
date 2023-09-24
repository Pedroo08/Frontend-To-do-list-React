import React from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../components/AuthForm";
import  img from './team checklist (1).gif'

function Login(){
    const navegate = useNavigate();

    const handleSubmit =  async (email,senha,auth) =>{
        if(!email|| !senha){
            alert("Por favor preencha os campos para continuar")

        }else{
            await signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
            // Signed in 
            localStorage.setItem("userid",userCredential.user.uid)
            // ...
            })
            .catch((error) => {
            console.log(error.message);
            alert("Usuário não encontrado")
          
            });
        }

        
   
    if(auth.currentUser){
        navegate('/tasks')
    }
}

    return(
        <section className="main-Login">
              <img  className= "login-img"src={img}/>
              <AuthForm Titulo={"Login"} Submit={handleSubmit} Register={false}/>
        </section>
      
    )
}

export default Login;