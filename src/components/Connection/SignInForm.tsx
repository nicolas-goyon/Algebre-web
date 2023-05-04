import React /*, { useState }*/ from 'react';
import {api} from 'src/assets/tools/ApiCenter';
import { inputValidator } from 'src/assets/tools/Utils';
import { config } from 'src/config';

export default
 function SignIn() {
    // const [isPasswordHidden, setPasswordHidden] = useState(true)// TODO : make function for password icon

    // Request to check email and password
    async function checkEmailPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // tests@gmail.com
        const emailElement = document.getElementById("email") as HTMLInputElement;
        const email = emailElement.value;
        const passwordElement = document.getElementById("password") as HTMLInputElement;
        const password = passwordElement.value;

        if(!email || !password){
            console.log("Email or password incorrect");
            return;
        }

        api.post(config.apiUrl + '/auth/login', {
            email: email,
            password: password
        })
        .then((response) => {
            if (response.status === 201) {
                console.log("OK");
                window.location.href = '/';
            }
            else if (response.status === 401) {
                console.log("Email or password incorrect");
            }
        }).catch((error) => {
            console.log("Error " + error);
        });
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
                    <div className='groupInput'>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            onBlur={inputValidator}
                            type="email"
                            autoComplete='email'
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        <span className="validationText flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" style={{display:'none'}}>
                            Email is required
                        </span>
                    </div>
                    <div className='groupInput'>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            onBlur={inputValidator}
                            type="password"
                            autoComplete='current-password'
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        <span className="validationText flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" style={{display:'none'}}>
                            Password is required
                        </span>
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