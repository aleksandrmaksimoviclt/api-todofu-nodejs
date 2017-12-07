import express from 'express';

const router = express.Router();

router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

export default router;
