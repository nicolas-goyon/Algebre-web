import Relation from "src/assets/classes/Relation";
import WorkspaceRelations from "src/assets/classes/WorkspaceRelation";
import csvReader from "src/assets/tools/CsvUtils";
import { WsData } from "src/assets/Types/WsData";


export const add = (text: string, name: string, inputArray: WsData[], setInputArray : (inputArray : WsData[]) => void) => {
    // TODO : Check if name is already used
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
    const newRelation = new Relation(name, dataRelation, headers);
    WorkspaceRelations.addTable(newRelation);

    
    const myData : WsData = {
        title: name,
        data: newRelation.getData(),
        columnNames: newRelation.getColumnNames(),
        isShrinkable: true,
    }

    setInputArray([...inputArray, myData])
}