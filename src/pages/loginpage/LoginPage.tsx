import React from "react";
import CheckBox from "../../components/checkbox/Checkbox";
import "./LoginPage.css"


interface Props {

}

interface State {
    username : string,
    password : string,
    rememberMe : boolean
}

export default class LoginPage extends React.Component<Props, State> {
    state : Readonly<State> = {
        username : "",
        password : "",
        rememberMe : false
    }

    _onRememberMe = (value : boolean) => {
        this.setState({rememberMe : value})
    }

    render() {
        return (
            <div className="h-100">
                <header className="pb-5">
                    <div className="py-5 text-center">
                        <img className="d-block mx-auto" src="./logo.png" alt="" height="120"/>
                    </div>
                </header>

                <main>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                <h4 className="text-center mb-3">Login to VetAlmael</h4>

                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Login"/>
                                </div>

                                <div className="mb-3">
                                    <input type="password" className="form-control"  placeholder="Password"/>
                                </div>

                                <div className="mb-3">
                                    <CheckBox text={"Remember me"} isChecked={this.state.rememberMe} onChange={this._onRememberMe}/>
                                </div>

                                <button className="btn btn-success btn-lg btn-block" type="submit">Login</button>

                            </div>
                        </div>
                    </div>
                </main>



            </div>
        )
    }
}