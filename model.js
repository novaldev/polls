const { Schema, model } = require("mongoose");

const QuestionSchema = Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add question"],
  },
  choices: [
    {
      text: {
        type: String,
        trim: true,
        required: [true, "Please add question"],
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = model("Question", QuestionSchema);
