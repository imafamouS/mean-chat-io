function isEmpty(str) {
    if (str == null || str.length === 0 || str == undefined) {
        return true;
    } else {
        return false;
    }
}


export default { isEmpty };