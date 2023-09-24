import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Services/FirebaseConfig";
import {signInAnonymously,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import  anoimg from './anonimo.png'
import googleimg from './google-icon.png'
import "./AuthForm.css";




function AuthForm({ Titulo, Submit, Register }) {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const navegate = useNavigate();
  const provider = new GoogleAuthProvider();
  
    const LoginAnonimo = ()=>{

        signInAnonymously(auth)
            .then((userCredential) => {
            console.log(userCredential)
            localStorage.setItem("userid",userCredential.user.uid)
            navegate('/tasks')
            })
            .catch((error) => {
            console( error.message)
            });

    }

    const LoginGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    localStorage.setItem("userid",user.uid)
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    navegate('/tasks')
  }).catch((error) => {
    // Handle Errors here.
    console.log( error.message)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...

    });
        
}
  return (
    <div className="box-form">
      <form className="AuthForm">
        <h2 className="titulo-form">{Titulo}</h2>

        <div className="input-box"></div>
            <input className="input-form" placeholder="Email"onChange={(e) => setEmail(e.target.value)}></input>
            <input className="input-form" type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} ></input>
        <div />

        <div className="button-box">
          <button className="btn-auth" onClick={() => Submit(email, senha, auth)} type="button"> {Register === false ? "Entrar" : "Cadastar"} </button>
         
          <Link to={Register === false ? "/register" : "/"}>
            <button className="btn-navegate">{Register === false ? "Se cadastre" : "Faça login"} </button>
          </Link>
         
        </div>
        <div className="alternatives-auth">
            <div className="icon-label">
                <img src={anoimg} className="icon-auth" onClick={LoginAnonimo}/>
                <label>Anônimo</label>
            </div>

            <div className="icon-label">
                <img src={googleimg} className="icon-auth" onClick={LoginGoogle}/>
                <label>Google</label>
            </div>
           
    
          </div>
          
      </form>
    </div>
  );
}

export default AuthForm;
