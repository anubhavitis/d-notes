"use client";

import { useState } from "react";

function Login({ user, isAuthenticated }) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        // Logic for handling sign in
        console.log('Sign in button clicked');
        user.auth(username, password);
    };



    const handleSignUp = (e) => {
        e.preventDefault();
        // Logic for handling sign up
        console.log('Sign up button clicked');
        user.create(username, password);
    };


    let resp = (<div> </div>);
    if (!isAuthenticated) {
        resp = (<div>
            <form className='flex flex-col gap-5 items-center justify-center'>
                <input
                    value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"
                    className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black' />
                <input
                    value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"
                    className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black' />
                <div>
                    <button
                        id="singin"
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 mx-2 rounded'
                        onClick={handleSignIn}
                    >Sing in</button>
                    <button
                        type="button" id="signup"
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 mx-2 rounded'
                        onClick={handleSignUp}
                    >Sign up</button>
                </div>
            </form >
        </div >);
    }

    return resp;
}

export default Login