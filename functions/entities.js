const Sila = require('sila-sdk').default;
const lib =require("./config");
Sila.configure(config);

  
async function check_handle()  {

     var res;

    do {
        var userHandle = createUserHandle();
         res = await Sila.checkHandle(userHandle);
       
    } while (res.statusCode != 200)

    console.log(res.statusCode); // 200
    console.log(res.data.reference); // your unique id
    console.log(res.data.status); // SUCCESS
    console.log(res.data.message);

};

function createUserHandle() {
    var randValue = Math.floor(100000 + Math.random() * 900000);
    console.log(`divvy-${randValue}`);
    return `divvy-${randValue}`;
}

check_handle();