import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
    return (

                <form id="login-form"  >
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <div class="form-group ">
                            <label  for="username">Username</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Username or Email"></input>
                        </div>
                        <div class="form-group ">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password"></input>

                        </div>

                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="autoSizingCheck"></input>
                                <label class="form-check-label" for="autoSizingCheck">
                                    Remember me
                                </label>
                        </div>


                        <button type="submit" class="btn btn-outline-dark btn-lg"  value="Submit" id="submit">Login </button>
                        <button type="button" class="btn btn-outline-dark btn-lg" id="new-user-button">New UserModel?</button>
                    </div>
                </form>
           );

}

export default LoginForm
