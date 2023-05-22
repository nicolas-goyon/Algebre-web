import Relation from '../classes/Relation';


// Define a simple test function that creates a relation with some data and performs some operations
async function test(): Promise<void> {
  // Create a new relation with some data
  const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 40 },
  ];
  const relation = new Relation("testRelation", data, ['id', 'name', 'age']);

  // Test getColumnNames method
  console.log('Column names:', relation.getColumnNames());

  // Test addRow method
  relation.addRow({ id: 4, name: 'Alice', age: 20 });
  relation.addRow({ id: 5, name: 'John', age: 30 }); // This row should not be added because it's a duplicate
  console.log('Data after adding rows:', relation.getData());

  // Test removeRowsWithCheck method
  relation.removeRowsWithCheck((row : any) => row.name === 'John');
  console.log('Data after removing rows:', relation.getData());

  // Test removeColumn method
  relation.removeColumn('age');
  console.log('Column names after removing column:', relation.getColumnNames());

  // Test clone method
  const clone = relation.clone();
  console.log('Data in clone:', clone.getData());

  // Test changeColumnName method
  relation.changeColumnName('id', 'userID');
  console.log('Column names after changing column name:', relation.getColumnNames());
  console.log('Data after changing column name:', relation.getData());

  // Test sendToCsv and loadFromCsv methods
  await relation.sendToCsv('test.csv');
//   const loadedDataset = await Relation.loadFromCsv('test.csv');
//   console.log('Data loaded from CSV:', loadedDataset.getData());

  // Test print method
    relation.print();

}

// Call the test function and handle any errors that occur
test()
  .catch((error) => {
    console.error('An error occurred:', error);
  });
