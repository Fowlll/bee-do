import React, { Component } from 'react';
import { FaCheck, FaCog, FaPlus, FaSignOutAlt, FaSquare } from 'react-icons/fa';
import auth, { firestore } from '../components/FirebaseConf';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { collection, setDoc, doc, query, getDocs, where, deleteDoc, onSnapshot } from '@firebase/firestore';

// Style
import '../style/tasks.css';

// Assets
import BeeImg from '../assets/img/bee.png';

class Tasks extends Component {

    constructor(props){
        super(props);

        this.state = {
            newTask: "",
            showSettings: false,
            showAddTask: false,
            user: {},
            tasks: []
        }

    }

    async queryAllTasks(userEmail){

        // Get all tasks

        const qTasks = query(collection(firestore, "tasks"), where("author", "==", userEmail));

        let querySnapTasks = await getDocs(qTasks);

        let allTasks = [];

        querySnapTasks.forEach((d) => {
            console.log(d);
            let newElement = {id: d.id, name: d.data().name, author: d.data().author};
            allTasks.push(newElement);
        });
        this.setState({tasks: allTasks});

    }

    async componentDidMount(){
        onAuthStateChanged(auth, async (user) =>{
            if(user){
                this.setState({user: {email: user.email}});
                const qUser = query(collection(firestore, "users"), where('email', '==', user.email));

                let querySnapUser = await getDocs(qUser);

                querySnapUser.forEach((adoc) =>{
                    this.setState({user: {firstname: adoc.data().firstname, email: adoc.data().email}});
                });



                const q = query(collection(firestore, "tasks"), where("author", "==", user.email));

                const unsubscribe = onSnapshot(q, (snap) => {
                    let allTasks = [];
        
                    snap.forEach((d) => {
                        let newElement = {id: d.id, name: d.data().name, author: d.data().author};
                        allTasks.push(newElement);
                    });
        
                    this.setState({tasks: allTasks});
                });
                

            }else{
                this.props.history.push("/login");
            }
        });

        


    }

    async handleSubmit(){
        if(this.state.newTask){
            
            let coll = collection(firestore, "tasks");

            setDoc(doc(coll), {
                name: this.state.newTask,
                author: this.state.user.email
            });
            this.handleAddTaskBtn();
        }
    }

    async handleAddTaskBtn(){
        
        if(!this.state.showAddTask){
            this.addTaskBox.style.display = "flex";
            setTimeout(() =>{
                this.setState({showAddTask: true});
                
                this.inp.focus();
            }, 100);
        }else{
            this.setState({showAddTask: false});
            await setTimeout(() =>{
                this.inp.value = "";
                this.addTaskBox.style.display = "none";
            }, 200);
            
            
        }
        
    }

    async deleteTask(taskId){
        await deleteDoc(doc(firestore, "tasks", taskId));
    }

    showSettings(){

        if(this.state.showSettings){
            this.setState({showSettings: !this.state.showSettings});
            setTimeout(() =>{
                this.settingsBox.style.display = "none";
            }, 200);
        }else{
            this.settingsBox.style.display = "block";
            setTimeout(() =>{
                this.setState({showSettings: !this.state.showSettings});
            }, 200);
        }

        

    }


    render() {
        return (
            <div id="tasks">

                <img id="bee1" src={BeeImg} alt="Bee" />
                <img id="bee2" src={BeeImg} alt="Bee" />
                <img id="bee3" src={BeeImg} alt="Bee" />
                <img id="bee4" src={BeeImg} alt="Bee" />
                
                <div id="header">
                    <h1>Bee-Do</h1>

                    <FaCog onClick={() => { this.showSettings() }} color="#FFFFFF" size={30} />

                    <div ref={(ref) => this.settingsBox = ref} className={"settingsBox" + ((this.state.showSettings)?" showSettings":"")}>

                        <button onClick={() => { signOut(auth) }} className="settings-item">
                            <FaSignOutAlt color="#000000" size={20} />
                            Se déconnecter
                        </button>

                    </div>

                </div>

                <div id="main">

                    <h1>Bonjour {this.state.user.firstname} !</h1>

                    <p>Gérez bien votre journée et tout se passera bien</p>

                    <div id="tasks-list">

                        {

                            this.state.tasks.map((t) =>{
                                return(
                                    <div className="task">

                                        <p>{t.name}</p>

                                        <FaSquare onClick={() => { console.log(t); this.deleteTask(t.id) }} color="#F1C36D" size={20} />

                                    </div>
                                );

                            })

                        }

                    </div>

                </div>

                <div ref={(box) => { this.addTaskBox = box}} className={"addTaskBox" + ((this.state.showAddTask)?" showTaskBox":"")}>
                    <h2>Que dois tu faire ?</h2>

                    <div className="task">

                        <form onSubmit={(e) => { this.handleSubmit(); e.preventDefault()}}>
                            <input ref={(inp) => { this.inp = inp }} onChange={(e) => { this.setState({newTask: e.target.value })}} type="text" maxLength="35" placeholder="Ma nouvelle tâche" />
                        </form>

                        <FaCheck color="#DDCEB7" size={30} />

                    </div>

                </div>

                <FaPlus onClick={() => {this.handleAddTaskBtn()}} id="addTask" color="#FFFFFF" size={30} />

            </div>
        );
    }
}

export default Tasks;