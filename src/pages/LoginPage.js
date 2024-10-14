import React, { useState } from 'react';

const LoginPage = () => {

    return (

        <div class="container">
            <h2>Log in</h2>
            <form>
                <div class="form-group">
                    <label for="email">Username:</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter username"></input>
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" placeholder="Enter password"></input>
                </div>
                <div class="checkbox">

                </div>
                <button type="button" class="btn btn-info">Submit</button>
            </form>
        </div>

    );
};

export default LoginPage;