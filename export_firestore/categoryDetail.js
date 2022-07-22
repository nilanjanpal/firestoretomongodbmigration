const utilities = require('../utilities');

module.exports.getCategoryDetails = (db) => {
    const categoryDetails = [];
    db.collection('Category').get().then(
        result => {
            result.docs.forEach(element => {
                const category = {
                    name: element._fieldsProto.Name.stringValue,
                    description: element._fieldsProto.Description.stringValue
                };
                categoryDetails.push(category);
            });
            // console.log(categoryDetail);
            utilities.writeJson('json_data/category.json',categoryDetails);
        }
    );
    return categoryDetails;
}