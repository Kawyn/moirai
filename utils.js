export function UUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ Math.random() * Number.MAX_SAFE_INTEGER & 15 >> c / 4).toString(16)
    );
}