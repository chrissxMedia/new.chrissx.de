export function csv(csv: string): [string[], string[][]] {
        const lines = csv.split(/[\r\n]+/).filter(e => e).map(e => e.split(','));
        const headers = lines.splice(0, 1)[0];
        return [headers, lines];
}
