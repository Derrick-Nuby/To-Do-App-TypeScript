import { ITodo } from "./../types/todo"
import { model, Schema, Types } from "mongoose"

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },

    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default model<ITodo>("Todo", todoSchema)