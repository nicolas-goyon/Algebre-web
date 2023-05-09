export default function csvReader(text: string) : [string[], string[][]] {
    const endOfLine = '\n';
    const separator = ',';
    let lines = text.split(endOfLine);
    let result : string[][] = [];
    let headers = lines[0].split(separator);
    for (let i = 1; i < lines.length; i++) {
        let currentline = lines[i].split(separator);
        let line : string[] = [];
        for (let j = 0; j < headers.length; j++) {
            line.push(currentline[j]);
        }
        result.push(line);
    }
    return [headers, result];
}