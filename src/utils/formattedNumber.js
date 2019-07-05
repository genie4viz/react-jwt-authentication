
export const numberWithCommasDecimals = (value, decimal = 0) => {
    if (value) {
        var parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts[1]) {
            if (parts[1].length < decimal) {
                parts[1] = parts[1].substring(0, parts[1].length - 1);
            } else {
                parts[1] = parts[1].substring(0, decimal);
            }
            return parts.join(decimal == 0 ? "" : ".");
        } else {
            return parts.join("");
        }
    } else
        return 0;
};

export const numberWithExpressive = value => {
    if (value) {
        if (value > 100) return numberWithCommasDecimals(value, 6);
        else if (value < 1) {
            if (value <= 0.000000001) return value.toPrecision(4);
            return numberWithCommasDecimals(value, 6);
        } else return numberWithCommasDecimals(value, 2)
    }
    return 0;
}

export const removeSymbol = value => {
    let idx = value.indexOf("(");
    if (idx > 0)
        value = value.substring(0, idx - 1);
    return value;
};