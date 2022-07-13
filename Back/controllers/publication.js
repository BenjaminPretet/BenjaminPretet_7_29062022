const publication = require('../models/publication')
const fs = require('fs');

exports.createPublication = (req, res, next) => {
  const publicationObject = JSON.parse(req.body.sauce);
  delete publicationObject._id;
  const publication = new publication({
    ...publicationObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  publication.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPublication = (req, res, next) => {
  const publicationObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  publication.updateOne({ _id: req.params.id, userId:req.auth.userId }, { ...publicationObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(500).json({ error }));
};

exports.deletePublication = (req, res, next) => {
  publication.findOne({ _id: req.params.id, userId:req.auth.userId })
    .then(publication => {
      const filename = publication.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        publication.deleteOne({ _id: req.params.id, userId:req.auth.userId })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(500).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOnePublication = (req, res, next) => {
    publication.findOne({ _id: req.params.id })
      .then(publication => {
        if(!publication)return res.status(404).json({ error: 'Not Found'})
        res.status(200).json(publication)
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getAllPublication = (req, res, next) => {
    publication.find()
      .then(publication => res.status(200).json(publication))
      .catch(error => res.status(500).json({ error }));
};