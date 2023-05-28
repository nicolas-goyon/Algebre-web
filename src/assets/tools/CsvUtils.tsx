export default function csvReader(text: string) : [string[], string[][]] {
    text = text.replace(/\r/g, '');
    const endOfLine = '\n';
    const separator = ',';
    let lines = text.split(endOfLine);
    let result : string[][] = [];
    let headers = lines[0].split(separator);
    for (let i = 1; i < lines.length; i++) {
        let currentline = lines[i].split(separator);
        let line : string[] = [];
        // Add each column to the line
        for (let j = 0; j < headers.length; j++) {
            line.push(currentline[j]);
        }
        // Check if the line is not empty
        for (let j = 0; j < line.length; j++) {
            if (line[j] !== "" && line[j] !== undefined && line[j] !== null && line[j] !== '') {
                result.push(line);
                break;
            }
        }
    }
    return [headers, result];
}