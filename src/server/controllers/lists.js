import List from '../models/list';

function load(req, res, next, id) {
  List.findOne({ _id: id})
    .populate('cards')
    .exec()
    .then((list) => {
      req.dbList = list;
      return next();
    }, (e) => next(e));
}

function get(req, res) {
  return res.json(req.dbList);
}

function create(req, res, next) {
  List.create({
      name: req.body.name
    })
    .then((savedList) => {
      return res.json(savedList);
    }, (e) => next(e));
}

function update(req, res, next) {
  const list = req.dbList;
  Object.assign(list, req.body);
  list.save()
    .then((savedList) => res.sendStatus(204),
      (e) => res.next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  List.find()
    .skip(skip)
    .limit(limit)
    .exec()
    .then((lists) => res.json(lists),
      (e) => next(e));
}

function remove(req, res, next) {
  const list = req.dbList;
  list.remove()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

export default { load, get, create, update, list, remove };
