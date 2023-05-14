
export default class Relation {
    private _name: string;
    private data: any[];
    private columnNames: string[];
  
    constructor(name: string, data: any[], columnNames?: string[]) {
        this._name = name;
        this.data = data;
        this.columnNames = columnNames || (data.length > 0 ? Object.keys(data[0]) : []);
    }
    
    public async sendToCsv(csvFilePath: string): Promise<void> {
      // Use a library like `csv-stringify` to write the DoubleEntryArray data to a CSV file
    }
  
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

    public join(relation: Relation, checkFn: (row1: Record<string, any>, row2: Record<string, any>) => boolean) : Relation {
        // concat all column names with the relation name to avoid conflicts
        const columnNames = this.columnNames.map((columnName) => this.name + '.' + columnName);
        const relationColumnNames = relation.columnNames.map((columnName) => relation.name + '.' + columnName);
        columnNames.push(...relationColumnNames);
        
        const newdata: Record<string, any>[] = [];
        this.data.forEach((row1) => {
            relation.data.forEach((row2) => {
                if (checkFn(row1, row2)) {
                    const newRow: Record<string, any> = {};
                    columnNames.forEach((columnName) => {
                        const [relationName, name] = columnName.split('.');
                        newRow[columnName] = relationName === this.name ? row1[name] : row2[name];
                    });
                    newdata.push(newRow);
                }
            });
        });
        this.data = newdata;
        this.columnNames = columnNames;
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
            return newdata.findIndex((r) => JSON.stringify(r) === JSON.stringify(row)) === index;
        });
        
        this.data = newdataWithoutDuplicates;
        this.columnNames = this.columnNames;
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
                if (JSON.stringify(row1) === JSON.stringify(row2)) {
                    newdata.push(row1);
                }
            });
        });
        this.data = newdata;
        this.columnNames = this.columnNames;
        this.name = this.name + ' intersect ' + relation.name;
        return this;
    }

    public difference(relation: Relation): Relation {
        // check if column names are the same and in the same order
        if (this.columnNames.length !== relation.columnNames.length) {
            throw new Error('Cannot difference relations with different number of columns');
        }
        this.columnNames.forEach((columnName, index) => {
            if (columnName !== relation.columnNames[index]) {
                throw new Error('Cannot difference relations with different column names');
            }
        });

        const newdata: Record<string, any>[] = [];
        this.data.forEach((row1) => {
            relation.data.forEach((row2) => {
                if (JSON.stringify(row1) !== JSON.stringify(row2)) {
                    newdata.push(row1);
                }
            });
        });
        this.data = newdata;
        this.columnNames = this.columnNames;
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
}