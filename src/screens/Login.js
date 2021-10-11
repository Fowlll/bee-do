import React, { Component } from 'react';
import auth from '../components/FirebaseConf';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
// Style
import '../style/login.css';

// Assets
import HoneyCombImg from '../assets/img/honeycomb.png';



class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        }

    }
    
    componentDidMount(){

        onAuthStateChanged(auth, (user) =>{
            if(user){
                console.log("On connecté là");
                this.props.history.push("/tasks");
            }else{
                console.log("On est plus connecté là");
            }
        })

    }

    submitForm(){

        if(this.state.email){
            if(this.state.password){
                console.log("Ah non là c'est pas bon");
                signInWithEmailAndPassword(auth, this.state.email, this.state.password).then((userCred) =>{
                    this.setState({error: "Connecté !"});
                }).catch((error) =>{
                    this.setState({error: error.message});
                })

            }else{
                this.setState({error: "Veuillez indiquer votre mot de passe"});
            }
        }else{
            this.setState({error: "Veuillez indiquer votre email"})
        }

    }


    render() {

        return (
            <div id="login">

                <img id="honeycomb1" src={HoneyCombImg} alt="honeycomb" />
                <img id="honeycomb2" src={HoneyCombImg} alt="honeycomb" />
                
                <h1>Bee-Do</h1>

                { this.state.error && 
                
                <p className="error">{this.state.error}</p>
                
                }

                <form id="login-form" onSubmit={(e) => { this.submitForm(); e.preventDefault()}}>
                    <input onChange={(e) => { this.setState({email: e.target.value})}} type="email" minLength="6" maxLength="100" placeholder="Identifiant" />
                    <input onChange={(e) => { this.setState({password: e.target.value})}} type="password" minLength="6" maxLength="100" placeholder="Mot de passe" />

                    <input className="btn special" type="submit" value="Se connecter" />
                </form>

                <p>Vous n'avez pas encore de compte ?
                    <br />
                    <a href="/register">Inscrivez vous !</a>
                </p>

            </div>
        );
    }
}

export default Login;