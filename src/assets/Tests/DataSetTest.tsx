import DataSet from '../classes/DataSet';

// Define a simple test function that creates a dataset with some data and performs some operations
async function test(): Promise<void> {
  // Create a new dataset with some data
  const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 40 },
  ];
  const dataset = new DataSet(data);

  // Test getColumnNames method
  console.log('Column names:', dataset.getColumnNames());

  // Test addRow method
  dataset.addRow({ id: 4, name: 'Alice', age: 20 });
  dataset.addRow({ id: 5, name: 'John', age: 30 }); // This row should not be added because it's a duplicate
  console.log('Data after adding rows:', dataset.getData());

  // Test removeRowsWithCheck method
  dataset.removeRowsWithCheck('name', (value : any) => value === 'John');
  console.log('Data after removing rows:', dataset.getData());

  // Test removeColumn method
  dataset.removeColumn('age');
  console.log('Column names after removing column:', dataset.getColumnNames());

  // Test clone method
  const clone = dataset.clone();
  console.log('Data in clone:', clone.getData());

  // Test changeColumnName method
  dataset.changeColumnName('id', 'userID');
  console.log('Column names after changing column name:', dataset.getColumnNames());
  console.log('Data after changing column name:', dataset.getData());

  // Test sendToCsv and loadFromCsv methods
  await dataset.sendToCsv('test.csv');
  const loadedDataset = await DataSet.loadFromCsv('test.csv');
  console.log('Data loaded from CSV:', loadedDataset.getData());

  // Test print method
    dataset.print();
}

// Call the test function and handle any errors that occur
test()
  .catch((error) => {
    console.error('An error occurred:', error);
  });
