import Renommage from "./Renomage";
import { Projection } from "../../assets/classes/Projection.tsx";


export default function Demo(prop) {
    return (
        <div className="flex flex-row w-full gap-5">
            <div className="w-full border-2 h-40 p-10">
                <Renommage />
                
            </div>
            
            <div className="w-full border-2 h-40">
                
            </div>
        </div>
    )
}