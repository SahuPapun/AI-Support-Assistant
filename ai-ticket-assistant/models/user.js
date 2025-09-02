import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    skills:[String]
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("User", userSchema);
