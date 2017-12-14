import express from 'express';
import listCtrl from '../controllers/lists';

// import auth from '../config/jwt';

const router = express.Router();

router.route('/')
  /** GET /api/list - Get list of users */
  .get(listCtrl.list)
  // .get(auth, userCtrl.list)

  /** POST /api/list - Create new user */
  .post(listCtrl.create);

router.route('/:listId')
  /** GET /api/list/:listId - Get list */
  .get(listCtrl.get)

  /** PUT /api/list/:listId - Update list */
  .put(listCtrl.update)

  /** DELETE /api/list/:listId - Delete user */
  .delete(listCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('listId', listCtrl.load);

export default router;
