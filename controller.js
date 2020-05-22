const Question = require('./model');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    res.status(500).send('error');
  }
};

exports.getQuestion = (req, res, next) => {
  const question = Question.findById(req.params.id);

  question
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => next(err));
};

exports.createQuestion = (req, res, next) => {
  const question = Question.create(req.body);

  question
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => next(err));
};

exports.updateQuestion = (req, res, next) => {
  const question = Question.findById(req.params.id);

  question
    .then((data) => {
      data.text = req.body.text;
      return data;
    })
    .then((data) => data.save())
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => next(err));
};

exports.deleteQuestion = (req, res, next) => {
  const question = Question.findById(req.params.id);

  question
    .then((data) => data.remove())
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => next(err));
};

exports.voteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return next(new Error('Question not exists'));
    }

    const choices = question.choices.find(
      (choice) => choice._id == req.body.vote
    );

    if (!choices) {
      return next(new Error('Invalid option'));
    }

    choices.votes += 1;

    await question.save();

    res.status(200).json({
      status: true,
      data: question,
    });
  } catch (error) {
    return next(error);
  }
};
