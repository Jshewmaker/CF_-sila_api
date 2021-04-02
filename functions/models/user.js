/* eslint-disable camelcase */
class User {
  constructor(
      id,
      name,
      date_of_birth,
      identity_value,
      street_address,
      city,
      state,
      country,
      postal_code,
      phone,
      email,
      website,
      doing_business_as_name,
      business_type,
      naics_code,
      private_key,
      sila_entity_name,
      sila_handle,
      is_homeowner,
      wallet,
      business_admin_document_id,
      project_id,
      bank_account_is_connected,
      test,
  ) {
    this.name = name;
    this.id = id;
    this.date_of_birth = date_of_birth;
    this.identity_value = identity_value;
    this.street_address = street_address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.postal_code = postal_code;
    this.phone = phone;
    this.email = email;
    this.doing_business_as_name = doing_business_as_name;
    this.business_type = business_type;
    this.naics_code = naics_code;
    this.website = website;
    this.private_key = private_key;
    this.sila_entity_name = sila_entity_name;
    this.sila_handle = sila_handle;
    this.is_homeowner = is_homeowner;
    this.wallet = wallet;
    this.business_admin_document_id = business_admin_document_id;
    this.project_id = project_id;
    this.bank_account_is_connected = bank_account_is_connected;
    this.test = test;
  }
  toString() {
    return "name: " + this.name +
            "id: " + this.id +
            "dob: " + this.date_of_birth +
            "id value: " + this.identity_value +
            "address: " + this.street_address +
            "city: " + this.city +
            "state: " + this.state +
            "country: " + this.country +
            "zip: " + this.postal_code +
            "phone: " + this.phone +
            "email: " + this.email +
            "dba: " + this.doing_business_as_name +
            "business type: " + this.business_type +
            "naics code: " + this.naics_code +
            "site: " + this.website +
            "private key: " + this.private_key +
            "sila entity name: " + this.sila_entity_name +
            "handle: " + this.sila_handle +
            "is homeowner: " + this.is_homeowner +
            "wallet: " + this.wallet +
            "business admin documentID: " + this.business_admin_document_id +
            "project: " + this.project_id +
            "bank connected: " + this.bank_account_is_connected+
            "test: " + this.test;
  }

  toJSON() {
    return {
      "name": this.name,
      "id": this.id,
      "dob": this.date_of_birth,
      "id value": this.identity_value,
      "address": this.street_address,
      "city": this.city,
      "state": this.state,
      "country": this.country,
      "zip": this.postal_code,
      "phone": this.phone,
      "email": this.email,
      "dba": this.doing_business_as_name,
      "business type": this.business_type,
      "naics code": this.naics_code,
      "site": this.website,
      "private key": this.private_key,
      "sila entity name": this.sila_entity_name,
      "handle": this.sila_handle,
      "is homeowner": this.is_homeowner,
      "wallet": this.wallet,
      "business admin documentID": this.business_admin_document_id,
      "project": this.project_id,
      "bank connected": this.bank_account_is_connected,
      "test": this.test,
    };
  }
}

// Firestore data converter
const userConverter = {
  toFirestore: function(user) {
    return {
      id: user.id,
      name: user.name,
      date_of_birth: user.date_of_birth,
      identity_value: user.identity_value,
      street_address: user.street_address,
      city: user.city,
      state: user.state,
      country: user.country,
      postal_code: user.postal_code,
      phone: user.phone,
      email: user.email,
      website: user.website,
      doing_business_as_name: user.doing_business_as_name,
      business_type: user.business_type,
      naics_code: user.naics_code,
      private_key: user.private_key,
      sila_handle: user.sila_handle,
      sila_entity_name: user.sila_entity_name,
      is_homeowner: user.is_homeowner,
      wallet: user.wallet,
      business_admin_document_id: user.business_admin_document_id,
      project_id: user.project_id,
      bank_account_is_connected: user.bank_account_is_connected,
      test: user.test,
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new User(
        data.id,
        data.name,
        data.date_of_birth,
        data.identity_value,
        data.street_address,
        data.city,
        data.state,
        data.country,
        data.postal_code,
        data.phone,
        data.email,
        data.website,
        data.doing_business_as_name,
        data.business_type,
        data.naics_code,
        data.private_key,
        data.sila_entity_name,
        data.sila_handle,
        data.is_homeowner,
        data.wallet,
        data.business_admin_document_id,
        data.project_id,
        data.bank_account_is_connected,
        data.test,
    );
  },
};

module.exports = {userConverter};
