class User {
    constructor(userID, email, idp) {
        this._userID = userID;
        this._email = email;
        this._IDP = idp;
    }
    get IDP() { return this._IDP; }
    get email() { return this._email; }
    get ID() { return this._userID}
}
module.exports = User;