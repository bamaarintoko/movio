export function slugformatter(str: string) {
    const formattedStr = str.replace(/[\W_]+/g, '-').toLowerCase();
    return formattedStr
}