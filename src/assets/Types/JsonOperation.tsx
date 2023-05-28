export type JsonOperation = {
    operation: string;
    relation: JsonOperation | undefined;
    relation1: JsonOperation | undefined;
    relation2: JsonOperation | undefined;
    champs: string | undefined;
    nom: string | undefined;
}