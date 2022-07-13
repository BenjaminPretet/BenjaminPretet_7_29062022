const publication = require("../models/publication");

exports.addLike = (req, res, next) => {
  if (req.body.like == 1) {
    publication.updateOne(
      { _id: req.params.id },
      {
        $push: { usersLiked: req.body.userId },
        $inc: { likes: req.body.like },
      }
    )

      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(500).json({ error }));
  }

  if (req.body.like == -1) {
    publication.updateOne(
      { _id: req.params.id },
      {
        $push: { usersDisliked: req.body.userId },
        $inc: { dislikes: 1 },
      }
    )

      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(500).json({ error }));
  }

  if (req.body.like == 0) {
    publication.findOne({ _id: req.params.id }).then((publicationFound) => {
      console.log(publicationFound.usersLiked);
      let usersLikedFound = publicationFound.usersLiked.includes(req.body.userId);

      if(usersLikedFound){
        publication.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersLiked: req.body.userId },
            $inc: { likes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(500).json({ error }));

      }
      else{
        publication.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersDisliked: req.body.userId },
            $inc: { dislikes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(500).json({ error }));
      }
    });
  }
};