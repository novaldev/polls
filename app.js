const express = require('express');
const mongoose = require('mongoose');
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
} = require('./controller');

const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost/polls', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.route('/questions').get(getQuestions).post(createQuestion);
router
  .route('/questions/:id')
  .get(getQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

router.post('/questions/:id/vote', voteQuestion);

app.use(express.json());

app.use(router);
app.use('/', (req, res) => res.send('hi there!'));

/** Error handler */
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});
app.listen(8000, () => console.log('listening on port 8000'));
