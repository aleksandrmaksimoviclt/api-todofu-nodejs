import express from 'express';
import cardCtrl from '../controllers/cards';

// import auth from '../config/jwt';

const router = express.Router();

router.route('/')
  /** GET /api/card - Get list of cards */
  .get(cardCtrl.list)
  // .get(auth, userCtrl.list)

  /** POST /api/card - Create new card */
  .post(cardCtrl.create);

router.route('/:cardId')
  /** GET /api/list/:listId - Get list */
  .get(cardCtrl.get)

  /** PUT /api/list/:listId - Update list */
  .put(cardCtrl.update)

  /** DELETE /api/list/:listId - Delete user */
  .delete(cardCtrl.remove);

// /** Load user when API with userId route parameter is hit */
router.param('cardId', cardCtrl.load);

export default router;
