'use strict'

var controller = {

    user: function(req, res) {
        return res.status(200).send({
            message: "Page de l'utilisateur"
        });

    },

    test: function(req, res) {
        return res.status(200).send({
            message: "Page de tests"
        });
    }

};

module.exports = controller;








