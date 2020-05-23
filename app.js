/** Import required 3rd party library */
const express = require('express');
const mongoose = require('mongoose');

/** Import controller */
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
} = require('./controller');

/** Applitacion initialization */
const app = express();
const router = express.Router();

/** Connect to database */
mongoose.connect('mongodb://localhost/polls', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/** Define routes */
router.route('/questions').get(getQuestions).post(createQuestion);
router
  .route('/questions/:id')
  .get(getQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

router.post('/questions/:id/vote', voteQuestion);

/** Middleware */
app.use(express.json());
app.use(router);

/** Serve public directory */
app.use(express.static('public'));

/** Error handler */
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

app.listen(8000, () => console.log('listening on port 8000'));
