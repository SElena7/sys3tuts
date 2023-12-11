import React from "react";
import HomeView from "./customComponents/HomeView";
import AboutView from "./customComponents/AboutView";
import SignupView from "./customComponents/SignupView";
import LoginView from "./customComponents/LoginView";
import NoviceView from "./customComponents/NoviceView";
import SingleNovicaView from "./customComponents/SingleNovicaView";
import AddNovicaView from "./customComponents/AddNovicaView";
import axios from 'axios';

class App extends React.Component {

constructor(props){
super(props);
this.state=
{
    currentPage:"none",
    newsID : 0,
    userStatus: {logged:false}

};
}

QSetView = (obj) => {
    this.setState(
        {

        currentPage: obj.page,
        newsID : obj.id || 0
    }); 
}

QGetView = (state) =>{

    let page = state.currentPage;
    switch (page) {
        
        case "about":
            return <AboutView/>;
        case "news":
            return <NoviceView QIDFromChild={this.QSetView}/>;
        case "signup":
            return <SignupView/>;
        case "login":
            return <LoginView QUserFromChild= {this.QSetUser}/>;
        case "addnews":
            return state.userStatus.logged ? <AddNovicaView QIDFromChild={this.QGetView}/> : ""
        case "singlenews":
            return<SingleNovicaView QIDFromChild={this.QGetView} data={this.state.newsID}/>
        default:
            return <HomeView/>;
                
    }
}
QSetUser = (obj) => {

        this.setState({ userStatus:{logged:true,user:obj}})
    }


    componentDidMount(){
        axios.get("http://88.200.63.148:8115/users/login")
        .then(res=>{
            console.log(res)
        })
    }

    render() {
        console.log(this.state)
        ///Here we should put what  we wan to display in the browser, for example
        return (
            <div id="APP" className="container">
                <div id="menu" className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                            <a onClick={() => this.QSetView({page : "home"})} className="navbar-brand" href="#">
                                Home
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a onClick={()=> this.QSetView({page : "about"})} className="nav-link " href="#">
                                            About
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a onClick={()=> this.QSetView({page : "news"})} className="nav-link " href="#">
                                            News
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a onClick={()=> this.QSetView({page : "addnews"})} className="nav-link">Add news</a>
                                    </li>

                                    <li className="nav-item">
                                        <a onClick={()=> this.QSetView({page : "signup"})} className="nav-link " href="#">
                                            Sign up
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a onClick={()=> this.QSetView({page : "login"})} className="nav-link " href="#">
                                            Login
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div id="viewer" className="row container">
                    {this.QGetView(this.state)}
                </div>
            </div>
        );
    }
}

export default App;
