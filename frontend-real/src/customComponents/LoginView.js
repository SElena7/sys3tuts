import React from 'react'
import axios from 'axios'

class LoginView extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {

            user:{
                type:"login"
            }
        }
    }

    QGetTextFromField = (e) =>{
        this.setState((prevState) => ({
           
            user:{...prevState.user, [e.target.name]:e.target.value}
        }))
    }
    
    QSendUserToParent = (obj) =>
    {
        this.props.QUserFromChild(obj)
    }

    QPostLogin = () => {
        let user = this.state.user;
        axios.post("http://88.200.63.148:8115/users/login", {
            username: user.username,
            password: user.password
        }, { withCredentials: true })
            .then(res => {
                // Handle the response if needed
                console.log("Sent to the server!");
                //console.log(res.data)
                this.QSendUserToParent(res.data)
            })
            .catch(error => {
                // Handle the error if needed
                console.error(error);
            });
    }
    
    render() {
        console.log(this.state)
        return (

            
            <div className="card" style={{ width: "400px", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px" }}>
                <form style={{ margin: "20px" }} >
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input onChange = {(e) => this.QGetTextFromField(e) }
                         name="username" type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input onChange = {(e) => this.QGetTextFromField(e)}
                        name="password" type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                </form>
                <button onClick={()=>this.QPostLogin()}
                style={{ margin: "10px" }} className="btn btn-primary bt">Login</button>
            </div>

        )
    }
}

export default LoginView

