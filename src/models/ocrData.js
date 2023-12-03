class OCRData {
    constructor(data) {
        this.identification_number = data.identification_number;
        this.name = data.name;
        this.last_name = data.last_name;
        this.date_of_birth = data.date_of_birth;
        this.date_of_issue = data.date_of_issue;
        this.date_of_expiry = data.date_of_expiry;
    }
}

module.exports = OCRData;
