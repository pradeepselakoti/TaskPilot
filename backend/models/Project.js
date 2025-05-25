import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  overview: {
    type: String,
    required: true,
    trim: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  repo_link: {
    type: String,
    trim: true,
  },
  environment_link: {
    type: String,
    trim: true,
  },
  tech_stack: {
    type: [String],
    default: [],
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectTeam",
  },
  discarded: {
    type: Boolean,
    default: false,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the model
export const Project = mongoose.model("Project", projectSchema);
