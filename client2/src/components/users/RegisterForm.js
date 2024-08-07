import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm() {
    return (

        <form id="register-form" autocomplete="on" >
            <div className="d-grid gap-2 col-6 mx-auto">
                <div className="form-group ">
                    <label  for="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username"></input>
                </div>
                <div className="form-group ">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email"></input>

                </div>
                <div className="form-group ">
                    <label for="password1">Password</label>
                    <input type="password" className="form-control" id="password1" name="password1" placeholder="Password"></input>

                </div>
                <div className="form-group ">
                    <label for="password2">Password once again</label>
                    <input type="password" className="form-control" id="password2" name="password2" placeholder="Password"></input>
                        <small id="passwordHelpBlock" className="form-text text-muted" >
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </small>
                </div>

               
                <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="agreement" name="agreement"></input>
                        <label className="form-check-label" for="agreement">
                            I Agree to the terms.
                        </label>
                </div>



                <button type="submit" className="btn btn-outline-dark btn-lg"  value="Submit" id="submit">Register </button>
                <button type="button" className="btn btn-outline-dark btn-lg" id="new-user-button">New UserModel?</button>
            </div>



        </form>
    );

}

export default RegisterForm
