import React, { useId } from "react";

// Component that allows the user to upload a csv file (small box with a button and a file input)
export default function CsvInput(prop: any){
    const id = useId();

    function handlerInput(){
        const callBack = prop.callBack;
        const input : HTMLInputElement = document.getElementById(id) as HTMLInputElement;
        if (input === null) {
            return;
        }
        const file = input.files?.item(0);

        if (file === undefined || file === null) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const text = event.target?.result;
            if (text === undefined) {
                return;
            }
            if (callBack === undefined) {
                return;
            }
            const filename = file.name.split(".")[0];
            callBack(text, filename);
        };
        reader.readAsText(file);
    }

    return (
        <div className="flex w-full items-center justify-center bg-grey-lighter">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-light-300 text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-light-300">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Select a file</span>
                <input type='file' className="hidden" id={id} onInput={handlerInput} />
            </label>
        </div>    
    )
}