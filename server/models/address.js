// Schema for addresses
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AddressSchema = new Schema ({
    address: String,
    balance: String,
    transactions: [Number]
});

// Exports the file
module.exports = mongoose.model('address', AddressSchema);