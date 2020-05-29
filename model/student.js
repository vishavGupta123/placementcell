const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  course: {
    dsa: {
      type: String,
      required: true,
    },
    webD: {
      type: String,
      required: true,
    },
    react: {
      type: String,
      required: true,
    },
  },
  interview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
  ],
  status: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
