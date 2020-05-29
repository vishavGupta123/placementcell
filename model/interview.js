const mongoose = require("mongoose");
const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;
