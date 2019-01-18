"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseHelper = require("firebase-functions-helper");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
app.use(cors);
const main = express();
const quotesCollection = 'quotes';
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main as 
// a parameter
exports.webApi = functions.https.onRequest(main);
// Add new quote
app.post('/quotes', (req, res) => {
    firebaseHelper.firestore
        .createNewDocument(db, quotesCollection, req.body);
    res.send('Create a new quote');
});
// Update new quote
app.patch('/quotes/:quoteId', (req, res) => {
    firebaseHelper.firestore
        .updateDocument(db, quotesCollection, req.params.quoteId, req.body);
    res.send('Update a new quote');
});
// View a quote
app.get('/quotes/:quoteId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, quotesCollection, req.params.quoteId)
        .then(doc => res.status(200).send(doc));
});
// View all quotes
app.get('/quotes', (req, res) => {
    firebaseHelper.firestore
        .backup(db, quotesCollection)
        .then(data => res.status(200).send(data));
});
// Delete a quote 
app.delete('/quotes/:quoteId', (req, res) => {
    firebaseHelper.firestore
        .deleteDocument(db, quotesCollection, req.params.quoteId);
    res.send('Document deleted');
});
//# sourceMappingURL=index.js.map