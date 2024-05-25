const sqlConnection = require("../Database/sqlConnection.js");
const TenantRegistrationForm = function () {};
const {
    test,
 
} = require("../tableName/test.js");

//UCA TUCSON MIGRATION AUDIT SUMMARY BY BU
TenantRegistrationForm.testapi = (
  cb
) => {
    var sql =
    `SELECT *
                  FROM 
                   ${test} 
                  
                  `;

    sqlConnection
    .query(sql)
    .then((rows) => {
      cb(null, rows);
    })
    .catch((err) => {
      cb(err, null);
    });
};



module.exports = TenantRegistrationForm;