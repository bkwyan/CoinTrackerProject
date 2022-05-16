const express = require('express');
const router = express.Router();

const Address = require('../models/address');

// Gets all the addresses
router.get('/', (req,res) => {
    Address.find().then(addresses => {
        var addressList = []
        addresses.forEach((address) => {
            addressList.push(address.address)
        })
        res.json(addressList)
    }).catch(err=>{
        res.send(err)
    })
})

// Gets the balance of all the addresses
router.get("/balance", (req, res) => {
    Address.find().then(addresses => {
        var addressBalances = {}
        addresses.forEach((address) => {
            addressBalances[address.address] = address.balance
        })
        res.json(addressBalances)
    }).catch(err=>{
        res.send(err)
    })
});

// Add a new address
router.post("/add", (req, res) =>{
    Address.findOne({address: req.body.address}).then(address => {
        if(!address){
            const newAddress = new Address({
                address: req.body.address,
                balance: req.body.balance
            });
            newAddress.save().then(address => {
                res.json("Successfully added new address")
            }).catch(err=>{
                res.json(err)
            })
        } else{
            res.json("This address has already been added")
        }
    })
});

// Removes an address
router.post('/remove', (req,res) => {
    console.log(req.body.address);
    Address.deleteOne({address: req.body.address}).then(data => {
        console.log(data);
        if(data.deletedCount == 1){
            res.send("Deleted Successfully")
        }
    })
});

// Adds the transactions to the specified address
router.post("/addTransactions", (req, res) =>{
    console.log(req.body.address)
    console.log(req.body.transactions)
    var balanceChanges = []
    req.body.transactions.forEach((transaction) => {
        balanceChanges.push(transaction.balance_change);
    })
    Address.findOneAndUpdate(req.body.address, {$set: {"transactions": balanceChanges}}, {new: true}).then(address =>{
        res.send(address);
    });
});
 
module.exports = router;