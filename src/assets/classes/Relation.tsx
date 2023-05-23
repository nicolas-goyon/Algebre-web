import { compareRecords } from "../tools/Utils";
export default class Relation {
    private _name: string;
    private data: any[];
    private columnNames: string[];
  
    constructor(name: string, data: any[], columnNames?: string[]) {
        this._name = name;
        this.data = data;
        this.columnNames = columnNames || (data.length > 0 ? Object.keys(data[0]) : []);
    }
    
    // public async sendToCsv(csvFilePath: string): Promise<void> {
    //   // Use a library like `csv-stringify` to write the DoubleEntryArray data to a CSV file
    // }
  
    public getColumnNames(): string[] {
        return this.columnNames;
    }
  
    public changeColumnName(oldName: string, newName: string): Relation {
      const columnNames = this.getColumnNames();
      const index = columnNames.indexOf(oldName);
      if (index >= 0) {
        columnNames[index] = newName;
        this.data.forEach((row) => {
          row[newName] = row[oldName];
          delete row[oldName];
        });
      }
      this.removeDuplicateRows();
      return this;
    }

    public selectColumns(columnNames: string[]): Relation {
        this.data = this.data.map((row) => {
            const newRow: Record<string, any> = {};
            columnNames.forEach((columnName) => {
                newRow[columnName] = row[columnName];
            });
            return newRow;
        });
        this.columnNames = columnNames;
        this.removeDuplicateRows();
        return this;
    }

    public getData(): any[] {
        return this.data;
    }

    public get name(): string {
        return this._name;
    }
    private set name(name: string) {
        this._name = name;
    }

  
    public removeColumn(name: string): Relation {
        const index = this.getColumnNames().indexOf(name);
        if (index >= 0) {
            this.data.forEach((row) => {
            delete row[name];
            });
        }

        this.columnNames = this.columnNames.filter((columnName) => columnName !== name);
        this.removeDuplicateRows();
        return this;
    }
  
    public clone(): Relation {
      return new Relation(this.name, JSON.parse(JSON.stringify(this.data)), JSON.parse(JSON.stringify(this.columnNames)));
    }
  
    public removeRowsWithCheck( checkFn: (value:  Record<string, any>) => boolean): Relation {
        this.selectRowsWithCheck((value) => !checkFn(value));
        return this;
    }

    public selectRowsWithCheck(checkFn: (value: Record<string, any>) => boolean): Relation {
        this.data = this.data.filter((row) => checkFn(row));
        return this;
    }

  
    public print(): void {
      console.table(this.data);
    }

    public addRow(row: Record<string, any>): Relation {
        const hasDuplicate = this.data.some((r) => {
          return Object.keys(row).every((key) => r[key] === row[key]);
        });
    
        if (!hasDuplicate) {
          this.data.push(row);
        }
        return this;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): Relation {
        this.name = name;
        return this;
    }

    public equals(relation: Relation): boolean {
        if(this.name !== relation.name) return false;
        if(this.data.length !== relation.data.length) return false;
        if(this.columnNames.length !== relation.columnNames.length) return false;
        for(let i = 0; i < this.data.length; i++){
            if(JSON.stringify(this.data[i]) !== JSON.stringify(relation.data[i])) return false;
        }
        for(let i = 0; i < this.columnNames.length; i++){
            if(this.columnNames[i] !== relation.columnNames[i]) return false;
        }
        return true;
    }

    public renameColumns(oldNames: string[], newNames: string[]): Relation {
        oldNames.forEach((oldName, index) => {
            this.changeColumnName(oldName, newNames[index]);
        });
        return this;
    }
    public renameColumnsFn(changeFn: (columnName: string) => string): Relation {
        this.columnNames.forEach((columnName) => {
            this.changeColumnName(columnName, changeFn(columnName));
        });
        return this;
    }

    public unifyColumnsOrder(relation: Relation): Relation {
        // check if all column names are in both relations
        const newColumnNames = relation.columnNames.filter((columnName) => this.columnNames.includes(columnName));
        if (newColumnNames.length !== this.columnNames.length || newColumnNames.length !== relation.columnNames.length) {
            throw new Error('Cannot unify columns order of relations with different columns');
        }
        this.data = this.data.map((row) => {
            const newRow: Record<string, any> = {};
            newColumnNames.forEach((columnName) => {
                newRow[columnName] = row[columnName];
            });
            return newRow;
        });

        this.columnNames = newColumnNames;
        return this;
    }

    public removeDuplicateRows(): Relation {
        const newdata: Record<string, any>[] = [];
        this.data.forEach((row) => {
            const hasDuplicate = newdata.some((r) => {
                return compareRecords(r, row);
            });
            if (!hasDuplicate) {
                newdata.push(row);
            }
        });
        this.data = newdata;
        return this;
    }

    public join(relation: Relation, checkFn: (row1: Record<string, any>, row2: Record<string, any>) => boolean) : Relation {
        // concat all column names with the relation name to avoid conflicts
        const newcolumnNames = this.columnNames.map((columnName) => this.name + '.' + columnName);
        const relationColumnNames = relation.columnNames.map((columnName) => relation.name + '.' + columnName);
        newcolumnNames.push(...relationColumnNames);
        
        const newdata: Record<string, any>[] = [];
        this.data.forEach((row1) => {
            relation.data.forEach((row2) => {
                if (checkFn(row1, row2)) {
                    const newRow: Record<string, any> = {};
                    newcolumnNames.forEach((columnName) => {
                        const [relationName, name] = columnName.split('.');
                        newRow[columnName] = relationName === this.name ? row1[name] : row2[name];
                    });
                    newdata.push(newRow);
                }
            });
        });
        this.data = newdata;
        this.columnNames = newcolumnNames;
        this.name = this.name + ' join ' + relation.name;
        return this;
    }

    public union(relation: Relation): Relation {
        // check if column names are the same and in the same order
        if (this.columnNames.length !== relation.columnNames.length) {
            throw new Error('Cannot union relations with different number of columns');
        }
        this.columnNames.forEach((columnName, index) => {
            if (columnName !== relation.columnNames[index]) {
                throw new Error('Cannot union relations with different column names');
            }
        });

        const newdata = this.data.concat(relation.data);
        // remove duplicates
        const newdataWithoutDuplicates = newdata.filter((row, index) => {
            return newdata.findIndex((r) => compareRecords(r, row)) === index;
        });
        
        this.data = newdataWithoutDuplicates;
        this.name = this.name + ' union ' + relation.name;
        return this;
    }

    public intersection(relation: Relation): Relation {
        // check if column names are the same and in the same order
        if (this.columnNames.length !== relation.columnNames.length) {
            throw new Error('Cannot intersect relations with different number of columns');
        }
        this.columnNames.forEach((columnName, index) => {
            if (columnName !== relation.columnNames[index]) {
                throw new Error('Cannot intersect relations with different column names');
            }
        });

        const newdata: Record<string, any>[] = [];
        this.data.forEach((row1) => {
            relation.data.forEach((row2) => {
                if (compareRecords(row1, row2)) {
                    newdata.push(row1);
                }
            });
        });
        this.data = newdata;
        this.name = this.name + ' intersect ' + relation.name;
        return this;
    }

    public difference(relation: Relation): Relation {
        // check if column names are the same and in the same order
        if (this.columnNames.length !== relation.columnNames.length) {
            console.log(this.columnNames, relation.columnNames);
            throw new Error('Cannot difference relations with different number of columns');
        }
        this.columnNames.forEach((columnName, index) => {
            if (columnName !== relation.columnNames[index]) {
                throw new Error('Cannot difference relations with different column names');
            }
        });

        const newdata: Record<string, any>[] = [];
        this.data.forEach((row1) => {
            const allDifferent = relation.data.every((row2) => {
                return !compareRecords(row1, row2);
            });
            if (allDifferent) {
                newdata.push(row1);
            }
        });
        this.data = newdata;
        this.name = this.name + ' difference ' + relation.name;
        return this;
    }

    public product(relation: Relation): Relation {
        // concat all column names with the relation name to avoid conflicts
        const newColumnNames = this.columnNames.map((thiscolumnName) => this.name + '.' + thiscolumnName);
        const relationColumnNames = relation.columnNames.map((relationCN) => relation.name + '.' + relationCN);
        newColumnNames.push(...relationColumnNames);
        const newdata: Record<string, any>[] = [];
        this.data.forEach((row1) => {
            relation.data.forEach((row2) => {
                const newRow: Record<string, any> = {};
                newColumnNames.forEach((newCN) => {
                    const [relationName, name] = newCN.split('.');
                    newRow[newCN] = relationName === this.name ? row1[name] : row2[name];
                });
                newdata.push(newRow);
            });
        });
        this.data = newdata;
        this.columnNames = newColumnNames;
        this.name = this.name + ' product ' + relation.name;
        return this;
    }

    public division(relation: Relation): Relation {
        let r = this.clone();
        let s = relation.clone();
        // get column names that are not in the relation
        const newColumnNames = this.columnNames.filter((columnName) => {
            return !relation.columnNames.includes(columnName);
        });

        let allCombinations = r.clone().selectColumns(newColumnNames).product(s.clone()); // Make pi_a(R) x S
        // Remove the first part of the column names "relationName." of allCombination
        allCombinations = allCombinations.renameColumnsFn((columnName) => {
            return columnName.split('.')[1];
        });
        allCombinations = allCombinations.unifyColumnsOrder(r.clone()); // Clean up

        allCombinations = allCombinations.difference(r.clone()); // make (pi_a(R)xS) - R
        const result = r.selectColumns(newColumnNames).clone().difference(allCombinations.selectColumns(newColumnNames)); // make 

        this.data = result.data;
        this.columnNames = result.columnNames;
        this.name = this.name + ' division ' + relation.name;
        return this;


    }
}