export function slugformatter(str: string) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, '-') // Replace spaces and special characters with '-'
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
}

export function replaceHyphens(str: string) {
    return str.replace(/-/g, '_');
}