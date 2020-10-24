import React from "react";
import CheckBox from "../../components/common/checkbox/Checkbox";
import "./LoginPage.css"
import {login} from "../../services/AuthService";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {RouterConstants} from "../../routes/RouterConstants";
import Loader from "../../components/content/loader/Loader";
import Logo from "../../images/logo.png"


interface State {
    username : string,
    password : string,
    rememberMe : boolean,

    isLoading : boolean
}

class LoginPage extends React.Component<RouteComponentProps, State> {
    state : Readonly<State> = {
        username : "",
        password : "",
        rememberMe : false,
        isLoading : false
    }

    _onSubmit = () : void => {
        let {username, password, rememberMe} = this.state
        this.setState({isLoading : true})
        login(username, password, rememberMe).then(value => {
            this.setState({isLoading : false})
            this.props.history.push(RouterConstants.home)
        }).catch(reason => {
            this.setState({isLoading : false})
            console.error("Login error", reason)
        })
    }

    _onUsernameInput = (e :  React.ChangeEvent<HTMLInputElement>) : void => {
        this.setState({username : e.target.value})
    }

    _onPasswordInput = (e :  React.ChangeEvent<HTMLInputElement>) : void => {
        this.setState({password : e.target.value})
    }

    _onRememberMe = (value : boolean) : void => {
        this.setState({rememberMe : value})
    }

    render() {
        return (
            <div className="h-100">
                <Loader show={this.state.isLoading}/>
                <header className="pb-5">
                    <div className="py-5 text-center">
                        <img className="d-block mx-auto" src={Logo} alt="" height="120"/>
                    </div>
                </header>
                <main>
                    <div className="container login-page-container">
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                <h4 className="text-center mb-3">Login to VetAlmael</h4>

                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Login" value={this.state.username} onChange={this._onUsernameInput}/>
                                </div>

                                <div className="mb-3">
                                    <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this._onPasswordInput}/>
                                </div>

                                <div className="mb-3">
                                    <CheckBox text={"Remember me"} isChecked={this.state.rememberMe} onChange={this._onRememberMe}/>
                                </div>

                                <button className="btn btn-success btn-lg btn-block" type="submit" onClick={this._onSubmit}>Login</button>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default withRouter(LoginPage)