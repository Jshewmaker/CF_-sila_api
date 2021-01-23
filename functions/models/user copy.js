class User {
    constructor(
        test,
        // id,
        // name,
        // dateOfBirthYYYYMMDD,
        // identityValue,
        // streetAddress,
        // city,
        // state,
        // country,
        // postalCode,
        // phone,
        // email,
        // website,
        // doingBusinessAsName,
        // businessType,
        // naicsCode,
        // privateKey,
        // silaEntityName,
        // silaHandle,
        // isHomeowner,
        // wallet,
        // businessAdminDocumentID,
        // projectID,
        // bankAccountIsConnected,
    ) {
        this.test;
        // this.name = name;
        // this.id = id;
        // this.dateOfBirthYYYYMMDD = dateOfBirthYYYYMMDD;
        // this.identityValue = identityValue;
        // this.streetAddress = streetAddress;
        // this.city = city;
        // this.state = state;
        // this.country = country;
        // this.postalCode = postalCode;
        // this.phone = phone;
        // this.email = email;
        // this.doingBusinessAsName = doingBusinessAsName;
        // this.businessType = businessType;
        // this.naicsCode = naicsCode;
        // this.website = website;
        // this.privateKey = privateKey;
        // this.silaEntityName = silaEntityName;
        // this.silaHandle = silaHandle;
        // this.isHomeowner = isHomeowner;
        // this.wallet = wallet;
        // this.businessAdminDocumentID = businessAdminDocumentID;
        // this.projectID = projectID;
        // this.bankAccountIsConnected = bankAccountIsConnected;

    }

}

// Firestore data converter

 function fromFirestore(snapshot) {
        const data = snapshot;
        return new User(
            data.test,
            // data.id,
            // data.name,
            // data.dateOfBirthYYYYMMDD,
            // data.identityValue,
            // data.streetAddress,
            // data.city,
            // data.state,
            // data.country,
            // data.postalCode,
            // data.phone,
            // data.email,
            // data.website,
            // data.doingBusinessAsName,
            // data.businessType,
            // data.naicsCode,
            // data.privateKey,
            // data.silaEntityName,
            // data.silaHandle,
            // data.isHomeowner,
            // data.wallet,
            // data.businessAdminDocumentID,
            // data.projectID,
            // data.bankAccountIsConnected,
        );
    
};

module.exports = {fromFirestore};