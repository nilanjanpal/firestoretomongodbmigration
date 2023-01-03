const userDetail = require('./userDetail');
const expenseDetail = require('./expenseDetail');
const mongoWrite = require('./../import_mongodb/writeData');
const mongoRead = require('./../import_mongodb/getData');

module.exports.reconcile = (db) => {
    const reconciledData = [];
    userDetail.getUserDetails(db).then(
        userResult => {
            userResult.forEach(element => {
                reconciledData.push({...element});
            });
            mongoWrite.insertData('expensetracker', 'UserDetail', reconciledData);
            const userData = mongoRead.findData('expensetracker', 'UserDetail');
            expenseDetail.getExpenseDetail(db).then(
                expenseResult => {
                    userData.then(
                        userResult => {
                            userResult.map(
                                element => {
                                    filteredExpense = expenseResult.filter(
                                        expenseData => {
                                            console.log(expenseData);
                                            console.log(element);
                                            if(expenseData.userId == element.userId) {
                                                expenseData.userId = element._id;
                                                console.log(expenseData);
                                                return expenseData;
                                            }
                                        }
                                    );
                                    // delete element.userId;
                                    // console.log(filteredExpense);
                                    // mongoWrite.insertData('expensetracker', 'ExpenseDetail', filteredExpense);
                                    return [...filteredExpense];
                                }
                            );
                        }
                    );
                    // console.log(updatedData);
                    mongoWrite.insertData('expensetracker', 'ExpenseDetail', expenseResult);
                }
            )
        }
    );
}