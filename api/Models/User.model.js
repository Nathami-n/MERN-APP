import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type:String,
      default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Ffree-png-ncime&psig=AOvVaw3QO8Zwr7vmlOrPGslQJ_vw&ust=1709561082136000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLDj9sOh2IQDFQAAAAAdAAAAABAE'
    }
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
