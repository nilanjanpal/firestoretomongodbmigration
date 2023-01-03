const utilities = require('../utilities');

module.exports.getExpenseDetail = (db) => {
    const expenseDetails = [];
    return new Promise(
        (resolve, reject) => {
            db.collection('ExpenseHistory').get().then(
                (result) => {
                    result.docs.forEach(element => {
                        const expense = {
                            itemName: element._fieldsProto.ItemName.stringValue,
                            comment: element._fieldsProto.Comment.stringValue,
                            purchaseDate: utilities.toDateTime(element._fieldsProto.PurchaseDate.timestampValue.seconds),
                            category: element._fieldsProto.Category.stringValue,
                            isEdited: element._fieldsProto.isEdited.booleanValue,
                            price: element._fieldsProto.Price.integerValue,
                            userId: element._fieldsProto.UserId.stringValue
                        }
                        expenseDetails.push(expense);
                    });
                    // console.log(expenseDetail);
                    utilities.writeJson('json_data/expense.json',expenseDetails);
                    resolve(expenseDetails);
                }
            );
        }
    );
}