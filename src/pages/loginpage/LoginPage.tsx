import React from "react";
import Checkbox from "../../components/common/checkbox/Checkbox";
import "./LoginPage.css"
import {login} from "../../services/AuthService";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Loader from "../../components/content/loader/Loader";
import Logo from "../../images/logo.png"
import ErrorMessage from "../../components/common/errormessage/ErrorMessage";
import {RouterConstants} from "../../routes/RouterConstants";


interface State {
    username : string,
    password : string,
    rememberMe : boolean,

    isLoading : boolean
    isError : boolean
}

const WRONG_CREDENTIALS : string = "Wrong password or login"

class LoginPage extends React.Component<RouteComponentProps, State> {
    state : Readonly<State> = {
        username : "",
        password : "",
        rememberMe : false,

        isLoading : false,
        isError : false
    }

    _onKeyUp = (e : any) => {
        if (e.which === 13) {
            this._onSubmit();
        }
    }

    _onSubmit = () : void => {
        let {username, password, rememberMe} = this.state
        this.setState({isLoading : true})
        login(username, password, rememberMe).then(value => {
            this.setState({isLoading : false})
            this.props.history.push(RouterConstants.home)
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    _onUsernameInput = (e :  React.ChangeEvent<HTMLInputElement>) : void => {
        this.setState({username : e.target.value, isError : false})
    }

    _onPasswordInput = (e :  React.ChangeEvent<HTMLInputElement>) : void => {
        this.setState({password : e.target.value, isError : false})
    }

    _onRememberMe = (value : boolean) : void => {
        this.setState({rememberMe : value})
    }

    render() {
        return (
            <div className="h-100">
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError} text={WRONG_CREDENTIALS}/>
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
                                    <Checkbox text={"Remember me"} isChecked={this.state.rememberMe} onChange={this._onRememberMe}/>
                                </div>

                                <button className="btn btn-success btn-lg btn-block focus" type="submit" onClick={this._onSubmit} onInput={this._onKeyUp}>Login</button>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default withRouter(LoginPage)