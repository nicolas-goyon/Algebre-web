import { TWsData } from "../Types/TWsData";
import csvReader from "../tools/CsvUtils";

export const addTableau = (text: string, name: string,relations : TWsData[], setRelations: (value: React.SetStateAction<TWsData[]>) => void) =>{
        let [headers, tableau] = csvReader(text);
        if(tableau === null || tableau === undefined || headers === null || headers === undefined){
            return;
        }

        const inputArea = document.getElementById('inputArea');
        if (!inputArea) {
            console.log("inputArea doesn't exist");
            return;
        }
        const dataRelation : any[]  = [];
        for(let i = 0; i < tableau.length; i++){
            const row = tableau[i];
            const newRow : any = {};
            for(let j = 0; j < headers.length; j++){
                const header = headers[j];
                newRow[header] = row[j];
            }
            dataRelation.push(newRow);
        }

        
        const myData = {
            title: name,
            data: dataRelation,
            columnNames: headers,
            isShrinkable: true,
        }

        setRelations([...relations, myData]);
       
}

export const extractTableau = (text: string, name: string) : TWsData | null =>{
    let [headers, tableau] = csvReader(text);
    if(tableau === null || tableau === undefined || headers === null || headers === undefined){
        return null;
    }

    const inputArea = document.getElementById('inputArea');
    if (!inputArea) {
        console.log("inputArea doesn't exist");
        return null;
    }
    const dataRelation : any[]  = [];
    for(let i = 0; i < tableau.length; i++){
        const row = tableau[i];
        const newRow : any = {};
        for(let j = 0; j < headers.length; j++){
            const header = headers[j];
            newRow[header] = row[j];
        }
        dataRelation.push(newRow);
    }

    
    const myData = {
        title: name,
        data: dataRelation,
        columnNames: headers,
        isShrinkable: true,
    }

    return myData;
   
}