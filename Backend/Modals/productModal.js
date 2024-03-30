import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},
 slug: {
    type: String,
    required: true,
 },
description: {
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true,
},
 category: {
    type: mongoose.ObjectId,
       ref: "Category",
      required: true,
},
quantity: {
    type: Number,
    required: true,
},
photo: {
    data: Buffer,
    contentType: String,
},
shipping: {
    type: Boolean,
},
ratings: [
    {
      star: {
        type: Number,
        required: true,
      },
      postedBy: {
        type: mongoose.ObjectId,
        ref: "User",
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
},
{ timestamps: true }
);


export default mongoose.model("Products", productSchema);
