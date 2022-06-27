import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cluster from 'express-cluster';
import { evaluate, evaluateBatch } from './eval';

cluster(
  (worker: any) => {
    const app = express();
    const router = express.Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    router.post('/sandbox', (req: any, res: any) => {
      res.send(evaluate(req.body.vars, req.body.count));
    });

    app.use('/', router);

    return app.listen(8000, '0.0.0.0', () => {
      console.log('evaluator running on port 8000');
    });
  },
  {},
);
