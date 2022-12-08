const {SingleUserEvent} = require("./single-user-event");
const {DOWNLOAD} = require("../const/event-types");

const DownloadEvent = class extends SingleUserEvent{
    constructor(userID, userEmail, userIDP, fileFormat, fileID, fileName, fileSize) {
        super(userID, userEmail, userIDP);
        this.event_type = DOWNLOAD;
        this.file_id = fileID;
        this.file_format = fileFormat;
        this.file_name = fileName;
        this.file_size = fileSize;
    }
}

module.exports = {
    DownloadEvent
}