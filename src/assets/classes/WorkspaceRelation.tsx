import Relation from "./Relation";

export default class WorkspaceRelations{
    private static tables : Relation[] = [];

    public static clearInstance() : void{   
        WorkspaceRelations.tables = [];
    }

    public static addTable(table : Relation) : void{
        WorkspaceRelations.tables.push(table.clone());
    }

    public static getTables() : Relation[]{
        let resTables : Relation[] = [];
        WorkspaceRelations.tables.forEach((table) => {
            resTables.push(table.clone());
        });
        return resTables;
    }

    public static  getTableByName(name : string) : Relation{
        let table = WorkspaceRelations.tables.find((table) => table.getName() === name);
        if(table === undefined){
            throw new Error("Table " + name + " not found");
        }
        return table.clone();
    }

}