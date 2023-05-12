import Relation from "../classes/Relation";
import WorkspaceRelation from "../classes/WorkspaceRelation";

export default function test(){
    const Etudiant = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
        { id: 3, name: 'Bob', age: 40 },
    ];
    const EtudiantRelation = new Relation("Etudiant", Etudiant, ['id', 'name', 'age']);

    const Cours = [
        { id: 1, name: 'Math', coef: 3 },
        { id: 2, name: 'Physique', coef: 2 },
        { id: 3, name: 'Francais', coef: 1 },
    ];
    const CoursRelation = new Relation("Cours", Cours, ['id', 'name', 'coef']);

    const Note = [
        { id: 1, idEtudiant: 1, idCours: 1, note: 15 },
        { id: 2, idEtudiant: 1, idCours: 2, note: 10 },
        { id: 3, idEtudiant: 1, idCours: 3, note: 12 },
        { id: 4, idEtudiant: 2, idCours: 1, note: 14 },
        { id: 5, idEtudiant: 2, idCours: 2, note: 16 },
        { id: 6, idEtudiant: 2, idCours: 3, note: 18 },
    ];
    const NoteRelation = new Relation("Note", Note, ['id', 'idEtudiant', 'idCours', 'note']);

    WorkspaceRelation.clearInstance();
    const WorkspaceRelationInstance = WorkspaceRelation.getInstance();
    WorkspaceRelationInstance.addTable(EtudiantRelation);
    WorkspaceRelationInstance.addTable(CoursRelation);
    WorkspaceRelationInstance.addTable(NoteRelation);

    console.log(WorkspaceRelationInstance.getTables());

    // Test if get tables return a clone
    console.log("=== Clone ===");
    const clone = WorkspaceRelationInstance.getTableByName("Etudiant");
    console.log('getTables return a clone:', clone !== undefined && clone !== EtudiantRelation && clone.equals(EtudiantRelation));

    // Code for an selection block 
    console.log("=== Selection ===");
    let etudiant = WorkspaceRelationInstance.getTableByName("Etudiant");
    if(etudiant){
        etudiant.selectRowsWithCheck("age", (age) => age > 25);
        console.log('Selection (age > 25) :');
        etudiant.print();
    }
    else {
        console.log('Table Etudiant not found');
        return;
    }

    // Check if the selection is a clone
    console.log("=== Clone after Selectio ===");
    const clone2 = WorkspaceRelationInstance.getTableByName("Etudiant");
    console.log('getTables return a clone:', clone2 !== undefined && clone2 !== EtudiantRelation && clone2.equals(EtudiantRelation) && !clone2.equals(etudiant));

    // Code for an projection block
    console.log("=== Projection ===");
    let cours = WorkspaceRelationInstance.getTableByName("Cours");
    if(cours){
        cours.selectColumns(['name', 'coef'])
        console.log('Projection (name, coef) :');
        cours.print();
    }
    else {
        console.log('Table Cours not found');
        return;
    }
    
    // Code for a Rename block
    console.log("=== Rename ===");
    let note = WorkspaceRelationInstance.getTableByName("Note");
    if(note){
        note.renameColumns(['idEtudiant', 'idCours'], ['idE', 'idC']);
        console.log('Rename (idEtudiant -> idE, idCours -> idC) :');
        note.print();
    }
    else {
        console.log('Table Note not found');
        return;
    }

    // Code for a Join block
    console.log("=== Join ===");
    etudiant = WorkspaceRelationInstance.getTableByName("Etudiant");
    note = WorkspaceRelationInstance.getTableByName("Note"); 
    if(etudiant && note){
        etudiant.join(note, (etudiant, note) => etudiant.id === note.idEtudiant);
        console.log('Join (idEtudiant -> idEtudiant, idCours -> idCours) :');
        etudiant.print();
    }
    else {
        console.log('Table Etudiant or Note not found');
        return;
    }

    // Code for a Union block
    console.log("=== Union ===");
    etudiant = WorkspaceRelationInstance.getTableByName("Etudiant");
    let etudiant2 = WorkspaceRelationInstance.getTableByName("Etudiant");
    if(etudiant && etudiant2){
        etudiant.selectRowsWithCheck("age", (age) => age > 25);
        etudiant2.selectRowsWithCheck("age", (age) => age <= 25);
        etudiant.union(etudiant2);
        console.log('Union :');
        etudiant.print();
    }

    // Code for a Intersection block
    console.log("=== Intersection ===");
    etudiant = WorkspaceRelationInstance.getTableByName("Etudiant");
    etudiant2 = WorkspaceRelationInstance.getTableByName("Etudiant");
    if(etudiant && etudiant2){
        etudiant.selectRowsWithCheck("age", (age) => age >= 25);
        etudiant2.selectRowsWithCheck("age", (age) => age <= 25);
        etudiant.intersection(etudiant2);
        console.log('Intersection :');
        etudiant.print();
    }
    
    // Code for a Difference block
    console.log("=== Difference ===");
    etudiant = WorkspaceRelationInstance.getTableByName("Etudiant");
    etudiant2 = WorkspaceRelationInstance.getTableByName("Etudiant");
    if(etudiant && etudiant2){
        etudiant.selectRowsWithCheck("age", (age) => age >= 25);
        etudiant2.selectRowsWithCheck("age", (age) => age <= 25);
        etudiant.difference(etudiant2);
        console.log('Difference :');
        etudiant.print();
    }

    // Code for a Product block
    console.log("=== Product ===");
    etudiant = WorkspaceRelationInstance.getTableByName("Etudiant");
    cours = WorkspaceRelationInstance.getTableByName("Cours");
    if(etudiant && cours){
        etudiant.product(cours);
        console.log('Product :');
        etudiant.print();
    }



}