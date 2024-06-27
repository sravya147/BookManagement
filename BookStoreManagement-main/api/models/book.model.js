import mongoose from "mongoose";


const BookSchema = new mongoose.Schema({

  title: { type: String, required: true },
  author: { type: String, required: true },
  image:{ type:String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
  publishedDate: Date,
  description:{ type: String, required: true },
  pages: Number,
  genre: String
});

const Book= mongoose.model('Book', BookSchema);

export default Book
