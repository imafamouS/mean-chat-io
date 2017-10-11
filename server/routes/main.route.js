import Express from 'express';

import UserRoutes from './user.route';

const router = Express.Router(); 

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/users', UserRoutes);

export default router;
