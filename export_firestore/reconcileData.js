const userDetail = require('./userDetail');
const expenseDetail = require('./expenseDetail');
const mongo = require('./../import_mongodb/writeData');

module.exports.reconcile = (db) => {
    const reconciledData = [];
    userDetail.getUserDetails(db).then(
        userResult => {
            userResult.forEach(element => {
                reconciledData.push({...element});
            });
            expenseDetail.getExpenseDetail(db).then(
                expenseResult => {
                    const updatedData = reconciledData.map(
                        element => {
                            filteredExpense = expenseResult.filter(
                                expenseData => {
                                    if(expenseData.userId === element.userId) {
                                        delete expenseData.userId;
                                        return expenseData;
                                    }
                                }
                            );
                            delete element.userId;
                            console.log(filteredExpense);
                            return {
                                ... element,
                                expenseDetail: [...filteredExpense]
                            }
                        }
                    );
                    console.log(updatedData);
                    mongo.insertData('expensetracker', 'UserDetail', updatedData);
                }
            )
        }
    );
}