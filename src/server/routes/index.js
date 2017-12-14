import express from 'express';
import authRoutes from './auth';
import listRoutes from './lists';
import userRoutes from './users';

const router = express.Router();

router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/auth', authRoutes);
router.use('/list', listRoutes);
router.use('/users', userRoutes);

export default router;
