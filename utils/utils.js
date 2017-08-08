function deepCopy(obj) {
    var jsonObj = JSON.parse(JSON.stringify(obj));
    return jsonObj;
}

module.exports = {
    deepCopy
}