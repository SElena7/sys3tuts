import React from 'react';
import axios from 'axios';

class SignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                type: "login"
            }
        };
    }

    QGetTextFromField = (e) => {
        this.setState((prevState) => ({
            user: { ...prevState.user, [e.target.name]: e.target.value }
        }));
    };

    QSendUserToParent = () => {
        // Validate the form before sending the user data to the parent
        if (this.validateForm()) {
            this.props.QUserFromChild(this.state.user);
        } else {
            // Handle validation errors or inform the user
            console.log("Please fill out all required fields.");
        }
    };

    validateForm = () => {
        const { username, email, password } = this.state.user;
        return username && email && password;
    };

    QPostSignUP = () =>{
        let user = this.state.user
        axios.post("http://88.200.63.148:8115/users/register",{
            username: user.username,
            email: user.email,
            password: user.password
        }).then(res=>{console.log("Sent to server!")}).catch(err=>{console.log(err)})

    }

    render() {
        return (
            <div className="card" style={{ width: "400px", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px" }}>
                <form style={{ margin: "20px" }}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            onChange={(e) => this.QGetTextFromField(e)}
                            name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            onChange={(e) => this.QGetTextFromField(e)}
                            name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            onChange={(e) => this.QGetTextFromField(e)}
                            name="password" type="password" className="form-control" id="exampleInputPassword1" required />
                    </div>
                </form>
                <button onClick={this.QPostSignUP} style={{ margin: "10px" }} className="btn btn-primary bt">Submit</button>
            </div>
        );
    }
}

export default SignupView;
