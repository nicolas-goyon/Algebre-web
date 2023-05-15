import React, { useState } from 'react';
import { inputValidator } from 'src/assets/tools/Utils';
import { api } from 'src/assets/tools/ApiCenter';
import { config } from "../../config";
const passwordSize = 8;

export default function SignUp() {
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    const [isPasswordConfirmHidden, setPasswordConfirmHidden] = useState(true)

    function checkEmailValid(event: React.FocusEvent<HTMLInputElement>) {
        const email = event.target.value;

        if(email.length === 0){
            return;
        }

        // request api to check if email is available
        api.get(config.apiUrl + '/auth/check/email/'+email)
        .then((response) => {
            if (response.status === 200) {
                console.log("OK");
            }
            else if (response.status === 401) {
                console.log("Email already used");
            }
        }).catch((error) => {
            console.log("Error " + error);
        });
    }

    function checkUsernameValid(event: React.FocusEvent<HTMLInputElement>) {
        const username = event.target.value;
        if (username.length > 0) {
            console.log(username); // TODO : check if username is available
        }
    }

    function checkPasswordValid(event: React.FocusEvent<HTMLInputElement>) {
        const passwordConfirm = event.target.value;
        const password = document.getElementsByTagName("input").namedItem("password")?.value;
        if (passwordConfirm.length > 0 && passwordConfirm === password) {
            console.log("OK");
        }
    }

    function passwordCaracteristicsOk(password: string): boolean {
        return password.length >= passwordSize
    }

    function createAccount(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const email = document.getElementsByTagName("input").namedItem("email")?.value;
        const username = document.getElementsByTagName("input").namedItem("username")?.value;
        const password = document.getElementsByTagName("input").namedItem("password")?.value;
        const passwordConfirm = document.getElementsByTagName("input").namedItem("passwordConfirm")?.value;
        
        if (!(email && username && password && passwordConfirm && passwordCaracteristicsOk(password))) {
            console.log("Email or username or password incorrect");
            return;
        }

        if (password !== passwordConfirm) {
            console.log("Password and password confirmation are not the same");
            return;
        }

        api.post(config.apiUrl + '/auth/signup', {
            email: email,
            username: username,
            password: password
        }).then((response) => {
            if (response.status === 201) {
                console.log("OK");
                // redirect to home page
                window.location.href = '/';
            }
            else if (response.status === 401) {
                console.log("Email already used");
            }
        }).catch((error) => {
            console.log("Error " + error);
        });
    }
    


    function displayPasswordIcon( passwordBoolean: boolean){
        return (
            passwordBoolean ? (
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

            )
        )
    }
    

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up an account</h3>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            onBlur={(e) => {checkEmailValid(e); inputValidator(e)}}
                            type="email"
                            autoComplete='email'
                            required
                            placeholder="Enter your email"
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        <span className="validationText flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" style={{display:'none'}}>
                            Email is required
                        </span>
                    </div>
                    <div>
                        <label className="font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            onBlur={(e) => {checkUsernameValid(e); inputValidator(e)}}
                            type="text"
                            autoComplete='username'
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        <span className="validationText flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" style={{display:'none'}}>
                            Username is required
                        </span>
                    </div>
                    <div className=''>
                        <label className="font-medium">
                            Password
                        </label>
                        <div className='relative'>
                            <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                onClick={() => setPasswordHidden(!isPasswordHidden)}
                            >
                                {displayPasswordIcon(isPasswordHidden)}
                            </button>
                            <input
                                id="password"
                                type={isPasswordHidden ? "password" : "text"}
                                onBlur={(e) => {checkPasswordValid(e); inputValidator(e)}}
                                autoComplete="new-password"
                                placeholder="Enter your password"
                                className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                            <span className="validationText flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" style={{display:'none'}}>
                                Password is required
                            </span>
                        </div >
                    </div >
                    <div className=''>
                        <label className="font-medium">
                            Confirm password
                        </label>
                        <div className='relative'>
                            <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                onClick={() => setPasswordConfirmHidden(!isPasswordConfirmHidden)}
                            >
                                {displayPasswordIcon(isPasswordConfirmHidden)}
                            </button>
                            <input
                                id="passwordConfirm"
                                type={isPasswordConfirmHidden ? "password" : "text"}
                                onBlur={(e) => {checkPasswordValid(e); inputValidator(e)}}
                                autoComplete="passwordConfirm"
                                placeholder="Enter your password"
                                className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                            <span className="validationText flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" style={{display:'none'}}>
                                Confirm password is required
                            </span>
                        </div>
                    </div>
                    <button onClick={createAccount}
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Sign Up
                    </button>
                    <div className="text-center">
                        <a href="#" className="hover:text-indigo-600">Forgot password?</a>
                    </div>
                </form>
            </div>
        </main>
    )
}