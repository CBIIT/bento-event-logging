class Token {
    constructor(uuid) {
        this._uuid = uuid;
    }
    get uuid() { return this._uuid; }
}

module.exports = Token;