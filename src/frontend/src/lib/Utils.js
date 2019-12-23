export function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function lZ(n: number) {
    return n < 10 ? "0" + n : n ;
}