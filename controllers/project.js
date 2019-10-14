'use strict'
var Project = require('../models/project');
var fs = require('fs');

var controller = {
   

    home: function(req, res) {
        return res.status(200).send({
            message: "Vous êtes bien sur la page d'accueil de l'application"
        });

    },

    testing: function(req, res) {
        return res.status(200).send({
            message: "Vous êtes bien sur la page de tests"
        });
    },

    saveProject: function(req,res) {
        var project = new Project();

        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({message: 'Erreur lors de la sauvegarde du document.'});

            if(!projectStored) return res.status(404).send({message: 'Impossible de sauvegarder le document.'});

            return res.status(200).send({project: projectStored,
                message: "Projet Sauvegardé !"});

        });
     },

     getProject: function(req, res) {

        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'Impossible de trouver le document.'});

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({message: 'Erreur lors du chargement du document.'});

            if(!project) return res.status(404).send({message: 'Impossible de trouver le document.'});

            return res.status(200).send({project});

        });
     },

     getProjects: function(req, res) {

        
        Project.find({}).exec((err, projects)=>{

            if (err) return res.status(500).send({message: 'Erreur lors du chargement des données.'});

            if(!projects) return res.status(404).send({message: 'Impossible de retracer les données'});

            return res.status(200).send({projects});

        })

    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        if(projectId == null) return res.status(404).send({message: 'Impossible de trouver le projet demandé.'});

        Project.findByIdAndUpdate(projectId, update, (err, projectUpdated) => {
            if (err) return res.status(500).send({message: 'Erreur lors de la mise à jour des données.'});

            if(!projectUpdated) return res.status(404).send({message: 'Impossible de retracer les données'});

            return res.status(200).send({projectUpdated});

        });

    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;
        

        if(projectId == null) return res.status(404).send({message: 'Impossible de trouver le projet demandé.'});

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if (err) return res.status(500).send({message: 'Erreur lors de la suppression des données.'});

            if(!projectDeleted) return res.status(404).send({message: 'Impossible de retracer les données à supprimer'});

            return res.status(200).send({projectDeleted,
                message: "Le projet a été supprimé de la base de données."
            });

        });

    },

    uploadImage:function(req,res){
        let projectID=req.params.id;
        var fileName='Erreur dans le chargement du fichier';
 
        if(req.files){
            var filePath = req.files.files.path; 
            var fileSplit=filePath.split('\\');
            var fileName=fileSplit[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];

            console.log(filePath);
 
            if(fileExt=='png'|fileExt=='jpg'|fileExt=='jpeg'|fileExt=='gif'){
                Project.findByIdAndUpdate(projectID,{image:fileName},{new:true}, (err,projectUpdated)=>{
                    if(err) return res.status(500).send({message:'Erreur dans le téléchargement du fichier'});
                    if(!projectUpdated) return res.status(404).send({message:'Le projet est introuvable'});
        
                    return res.status(200).send({project:projectUpdated});
                });
            }else{
                fs.unlink(filePath,(err)=>{return res.status(200).send({message:'Lextension du fichier est invalide'});});
            }
 
        }else{return res.status(200).send({message: fileName})}
    }

};

module.exports = controller;