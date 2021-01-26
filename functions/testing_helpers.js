const firestore = require("./services/firebase");
const admin = require("firebase-admin");


async function testAddDataToFirestore(){
    var data = {
        "id": '0Woej2JWoWVsxmRhqm4tkado5MQ2',
        "name": 'Joshua Shewmaker',
        "date_of_birth": '1991-12-11',
        "identity_value": '134763456',
        "street_address": "344 E Camborne",
        "city": 'Ferndale',
        "state": 'MI',
        "country": 'US',
        "postal_code": '43882',
        "phone": '345-653-6865',
        "email": 'test@test.com',
       
    }
    await admin.firestore().collection('users').doc('0Woej2JWoWVsxmRhqm4tkado5MQ2').set(data);
}

module.exports = {testAddDataToFirestore};