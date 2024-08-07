import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
    return (

                <form id="login-form"  >
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <div className="form-group ">
                            <label  for="username">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username or Email"></input>
                        </div>
                        <div className="form-group ">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>

                        </div>

                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="autoSizingCheck"></input>
                                <label className="form-check-label" for="autoSizingCheck">
                                    Remember me
                                </label>
                        </div>


                        <button type="submit" className="btn btn-outline-dark btn-lg"  value="Submit" id="submit">Login </button>
                        <button type="button" className="btn btn-outline-dark btn-lg" id="new-user-button">New UserModel?</button>
                    </div>
                </form>
           );

}

export default LoginForm
