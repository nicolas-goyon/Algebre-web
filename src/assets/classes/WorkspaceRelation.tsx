import Relation from "./Relation";

export default class WorkspaceRelations{
    private static instance : WorkspaceRelations;
    private tables : Relation[];

    private constructor(){
        this.tables = [];
    }

    public static getInstance() : WorkspaceRelations{
        if(!WorkspaceRelations.instance){
            WorkspaceRelations.instance = new WorkspaceRelations();
        }
        return WorkspaceRelations.instance;
    }

    public static clearInstance() : void{   
        WorkspaceRelations.instance = new WorkspaceRelations();
    }

    public addTable(table : Relation) : void{
        this.tables.push(table.clone());
    }

    public getTables() : Relation[]{
        let resTables : Relation[] = [];
        this.tables.forEach((table) => {
            resTables.push(table.clone());
        });
        return resTables;
    }

    public getTableByName(name : string) : Relation | undefined{
        return this.tables.find((table) => table.getName() === name)?.clone();
    }
}