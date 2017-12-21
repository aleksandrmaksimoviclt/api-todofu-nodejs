import Card from '../models/card';

function load(req, res, next, id) {
  Card.findById(id)
    .exec()
    .then((card) => {
      req.dbCard = card;
      return next();
    }, (e) => next(e));
}

function get(req, res) {
  return res.json(req.dbCard);
}

function create(req, res, next) {
  Card.create({
      title: req.body.title,
      list: req.body.list
    })
    .then((savedCard) => {
      return res.json(savedCard);
    }, (e) => next(e));
}

function update(req, res, next) {
  const card = req.dbCard;
  Object.assign(card, req.body);
  card.save()
    .then((savedCard) => {
      res.json(savedCard);
    },
    (e) => next(e));
}

function list(req, res, next) {
  Card.find()
    .exec()
    .then((cards) => res.json(cards),
      (e) => next(e));
}

function remove(req, res, next) {
  const card = req.dbCard;
  card.remove()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

export default { load, get, create, update, list, remove };
