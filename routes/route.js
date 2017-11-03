const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

//retrieving contacts
router.get('/contacts', (req, res, next) => {
    Contact.find(function(err, contacts) {
        res.json(contacts);
    })
});

//retrieve one contact
router.get('/contact/:id', (req, res, next) => {
    Contact.findOne({ _id: req.params.id }, function(err, contact) {
        if (err) {
            res.json(err);
        }

        res.json(contact);

    });
});

//add contact
router.post('/contact', (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone

    });

    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: 'Failed to add contact' });
        } else {
            res.json({ msg: 'Contact added successfully' });;
        }
    });
});

//delete contacts
router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});


//update contacts
router.put('/contact/:id', (req, res, next) => {
    Contact.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone
            }
        },
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("successs");

            }
        });
});

module.exports = router;