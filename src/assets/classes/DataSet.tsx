// import csv from 'csv-parse';
// import stringify from 'csv-stringify';
// import fs from 'fs';


export default class DataSet {
    private data: any[];
    private columnNames: string[];
  
    constructor(data: any[], columnNames?: string[]) {
        this.data = data;
        this.columnNames = columnNames || (data.length > 0 ? Object.keys(data[0]) : []);
    }
  
    public static async loadFromCsv(csvFilePath: string): Promise<DataSet> {
        // Use a library like `csv-parse` to read the CSV file and return a new instance of DoubleEntryArray
        
        return new DataSet([]);
    }
  
    public async sendToCsv(csvFilePath: string): Promise<void> {
      // Use a library like `csv-stringify` to write the DoubleEntryArray data to a CSV file
    }
  
    public getColumnNames(): string[] {
        return this.columnNames;
    }
  
    public changeColumnName(oldName: string, newName: string): void {
      const columnNames = this.getColumnNames();
      const index = columnNames.indexOf(oldName);
      if (index >= 0) {
        columnNames[index] = newName;
        this.data.forEach((row) => {
          row[newName] = row[oldName];
          delete row[oldName];
        });
      }
    }
    public getData(): any[] {
        return this.data;
    }
  
    public removeColumn(name: string): void {
      const index = this.getColumnNames().indexOf(name);
      if (index >= 0) {
        this.data.forEach((row) => {
          delete row[name];
        });
      }

        this.columnNames = this.columnNames.filter((columnName) => columnName !== name);
    }
  
    public clone(): DataSet {
      return new DataSet(JSON.parse(JSON.stringify(this.data)));
    }
  
    public removeRowsWithCheck(columnName: string, checkFn: (value: any) => boolean): void {
      this.selectRowsWithCheck(columnName, (value) => !checkFn(value));
    }

    public selectRowsWithCheck(columnName: string, checkFn: (value: any) => boolean): void {
        this.data = this.data.filter((row) => checkFn(row[columnName]));
    }

  
    public print(): void {
      console.table(this.data);
    }

    public addRow(row: Record<string, any>): void {
        const hasDuplicate = this.data.some((r) => {
          return Object.keys(row).every((key) => r[key] === row[key]);
        });
    
        if (!hasDuplicate) {
          this.data.push(row);
        }
      }
  }
  