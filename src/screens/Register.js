import React, { Component } from 'react';
import auth, { firestore } from '../components/FirebaseConf';
import { onAuthStateChanged, createUserWithEmailAndPassword } from '@firebase/auth';
import { collection, setDoc, doc } from '@firebase/firestore';
// Style
import '../style/register.css';

// Assets
import HoneyCombImg from '../assets/img/honeycomb.png';

class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confPassword: "",
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


    async submitForm(){

        

        if(this.state.lastname){
            if(this.state.firstname){
                if(this.state.email){
                    if(this.state.password){
                        if(this.state.confPassword){
                            if(this.state.password == this.state.confPassword){
                                
                                this.setState({error: "C'est ok !"});

                                createUserWithEmailAndPassword(auth, this.state.email, this.state.password);

                                
                                const coll = collection(firestore, "users");

                                await setDoc(doc(coll), {
                                    lastname: this.state.lastname,
                                    firstname:  this.state.firstname,
                                    email: this.state.email,
                                    type: 0
                                });
                                

                            }else{
                                this.setState({error: "Les mots de passe ne correpondent pas"});
                            }
                        }else{
                            this.setState({error: "Veuillez indiquer confirmer votre mot de passe"});
                        }
                    }else{
                        this.setState({error: "Veuillez indiquer un mot de passe"});
                    }
                }else{
                    this.setState({error: "Veuillez indiquer votre email"});
                }
            }else{
                this.setState({error: "Veuillez indiquer votre prénom"});
            }
        }else{
            this.setState({error: "Veuillez indiquer votre nom"});
        }
        
    }


    render() {
        return (
            <div id="register">

                <img id="honeycomb1" src={HoneyCombImg} alt="honeycomb" />
                <img id="honeycomb2" src={HoneyCombImg} alt="honeycomb" />
                
                <h1>Inscription</h1>

                { this.state.error && 

                <p className="error">{this.state.error}</p>

                }

                <form id="register-form" onSubmit={(e) => { this.submitForm(); e.preventDefault()}}>
                    <input onChange={(e) => { this.setState({lastname: e.target.value})}} type="text" minLenght="10" maxLength="100" placeholder="Nom" />
                    <input onChange={(e) => { this.setState({firstname: e.target.value})}} type="text" minLenght="10" maxLength="100" placeholder="Prénom" />
                    <input onChange={(e) => { this.setState({email: e.target.value})}} name="email" type="email" minLenght="10" maxLength="100" placeholder="Adresse email" />
                    <input onChange={(e) => { this.setState({password: e.target.value})}} type="password" minLenght="10" maxLength="100" placeholder="Mot de passe" />
                    <input onChange={(e) => { this.setState({confPassword: e.target.value})}} type="password" minLenght="10" maxLength="100" placeholder="Confirmation du mot de passe" />

                    <input name="register" className="btn special" type="submit" value="S'inscrire" />
                </form>

                <p>Vous avez déjà un compte ?
                    <br />
                    <a href="/login">Connectez vous !</a>
                </p>

            </div>
        );
    }
}

export default Register;