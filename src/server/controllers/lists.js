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

function update(req, res) {
  const list = req.dbList;
  Object.assign(list, req.body);
  list.save()
    .then((savedList) => {
      res.json(savedList)
    },
    (e) => res.next(e));
}

function list(req, res) {
  List.find(function (e, lists) {
    const options = [{ path: 'cards' }]
    const promise = List.populate(lists, options);
    promise.then(updatedLists => res.json(updatedLists), (e) => res.next(e) );
  })
}

function remove(req, res, next) {
  const list = req.dbList;
  list.remove()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

export default { load, get, create, update, list, remove };
