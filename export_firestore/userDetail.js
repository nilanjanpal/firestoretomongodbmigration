const utilities = require('../utilities');
const mongo = require('../import_mongodb/writeData');

module.exports.getUserDetails = (db) => {
    const userDetails = [];
    return new Promise(
        (resolve, reject) => {
            db.collection('UserDetail').get().then(
                result => {
                    result.docs.forEach(element => {
                        const userDetail = {
                            userId: element._fieldsProto.UserId.stringValue,
                            firstName: element._fieldsProto.FirstName.stringValue,
                            lastName: element._fieldsProto.LastName.stringValue,
                            email: element._fieldsProto.EmailId.stringValue,
                            dateofBirth: utilities.toDateTime(element._fieldsProto.DateOfBirth.timestampValue.seconds)
                        }
                        userDetails.push(userDetail);
                    });
                    resolve(userDetails);
                }
            );
        }
    );
}


