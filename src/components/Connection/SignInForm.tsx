import React, { useState } from 'react';
import {ApiClass} from 'src/assets/tools/ApiCenter';

export default async function SignIn() {
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    // TODO : make function for password icon
    const api = await ApiClass.getInstancce();

    // Request to check email and password
    function checkEmailPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("test");
        // tests@gmail.com
        const emailElement = document.getElementById("email") as HTMLInputElement;
        const email = emailElement.value;
        const passwordElement = document.getElementById("password") as HTMLInputElement;
        const password = passwordElement.value;
        console.log("email : " + email + " password : " + password);
        if (email && password) {
            api.get('/auth/login/'+email+'/'+password)
            .then((response) => {
                console.log("OK" + response);
                console.info(response);
            }).catch((error) => {
                console.log("Error " + error);
                console.info(error);
            })


            // api.post('/auth/login', {
            //     email: email,
            //     password: password
            // }).then((response) => {
            //     console.log("OK" + response);
            //     console.info(response);
            // }).catch((error) => {
            //     console.log("Error " + error);
            //     console.info(error);
            // })
        }
    }
    
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="">Don't have an account? <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
                    </div>
                </div>
                <form
                    onSubmit={checkEmailPassword}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Sign in
                    </button>
                    <div className="text-center">
                        <a href="#" className="hover:text-indigo-600">Forgot password?</a>
                    </div>
                </form>
            </div>
        </main>
    )
}