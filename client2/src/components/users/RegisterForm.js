import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm() {
    return (

        <form id="register-form" autocomplete="on" >
            <div class="d-grid gap-2 col-6 mx-auto">
                <div class="form-group ">
                    <label  for="username">Username</label>
                    <input type="text" class="form-control" id="username" name="username" placeholder="Username"></input>
                </div>
                <div class="form-group ">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email"></input>

                </div>
                <div class="form-group ">
                    <label for="password1">Password</label>
                    <input type="password" class="form-control" id="password1" name="password1" placeholder="Password"></input>

                </div>
                <div class="form-group ">
                    <label for="password2">Password once again</label>
                    <input type="password" class="form-control" id="password2" name="password2" placeholder="Password"></input>
                        <small id="passwordHelpBlock" class="form-text text-muted" >
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </small>
                </div>

               
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="agreement" name="agreement"></input>
                        <label class="form-check-label" for="agreement">
                            I Agree to the terms.
                        </label>
                </div>



                <button type="submit" class="btn btn-outline-dark btn-lg"  value="Submit" id="submit">Register </button>
                <button type="button" class="btn btn-outline-dark btn-lg" id="new-user-button">New UserModel?</button>
            </div>



        </form>
    );

}

export default RegisterForm
