export function getConditions(value_champs: string): { conditions: string[][], conditionLinks: string[] } {
    // Split the && and || then split with the = and the != and the > and the < and the >= and the <=
    // example : a=1 && b<=2 || c>3 && d!=4
    // conditions = [
    //     ["a", "=", "1"],
    //     ["b", "<=", "2"],
    //     ["c", ">", "3"],
    //     ["d", "!=", "4"]
    // ]
    // conditionLinks = [ "&&", "||", "&&" ]

    let conditions: string[][] = [];
    let conditionLinks: string[] = [];
    let conditionsString = value_champs.split(' && ');
    conditionsString.forEach((conditionString: string) => {
        let condition = conditionString.split(' || ');
        condition.forEach((conditionElement: string) => {
            let conditionElementSplit = conditionElement.split(' ');
            conditions.push([conditionElementSplit[0], conditionElementSplit[1], conditionElementSplit[2]]);
            conditionLinks.push('||');
        });
        conditionLinks.push('&&');
    });
    conditionLinks.pop();
    const result = {
        conditions: conditions,
        conditionLinks: conditionLinks
    }
    return result;
}