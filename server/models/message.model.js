import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: false // optional, can be left empty if no text is provided
  },
  image: {
    type: String,
    required: false // optional, can be left empty if no image is provided
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
