const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const readAndReconcileData = require('./export_firestore/reconcileData');
const mongo = require('./import_mongodb/writeData');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

readAndReconcileData.reconcile(db);
// userDetail.getUserDetails(db);
// expenseDetail.getExpenseDetail(db);
// categoryDetail.getCategoryDetails(db);