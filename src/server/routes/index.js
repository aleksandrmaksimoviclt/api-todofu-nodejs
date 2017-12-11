import express from 'express';
import authRoutes from './auth';
import userRoutes from './users';

const router = express.Router();

router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
