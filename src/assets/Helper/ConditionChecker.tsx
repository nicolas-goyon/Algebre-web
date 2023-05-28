export type Condition = [string, string, string];
export type Link = '&&' | '||';

export function createRecordChecker(conditions: Condition[], links: Link[]): (record: Record<string, string>) => boolean {
    const conditionFns = conditions.map((operation) => {
      let [field, operator, value] = operation;
      console.log(operation)
      switch (operator) {
        case '>':
          return (record: Record<string, string>) => Number(record[field]) > Number(value);
        case '<':
          return (record: Record<string, string>) => Number(record[field]) < Number(value);
        case '>=':
          return (record: Record<string, string>) => Number(record[field]) >= Number(value);
        case '<=':
          return (record: Record<string, string>) => Number(record[field]) <= Number(value);
        case '=':
          return (record: Record<string, string>) => record[field] === value;
        default:
          throw new Error(`Invalid operator: ${operator}`);
      }
    });
  
    const linkFns = links.map((link) => {
      switch (link) {
        case '&&':
          return (a: boolean, b: boolean) => a && b;
        case '||':
          return (a: boolean, b: boolean) => a || b;
        default:
          throw new Error(`Invalid link: ${link}`);
      }
    });
  
    const checkFn = (record: Record<string, string>) => {
      let result = conditionFns[0](record);
      for (let i = 1; i < conditionFns.length; i++) {
        result = linkFns[i - 1](result, conditionFns[i](record));
      }
      return result;
    };
  
    return checkFn;
  }