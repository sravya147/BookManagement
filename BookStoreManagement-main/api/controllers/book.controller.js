import Book from "../models/book.model.js";
import upload from "../middleware/upload.js"


export const createBook = async (req, res) => {
  const { title, author, publishedDate, pages, genre, description } = req.body;
  const image = req.file ? req.file.path : undefined;

  try {
    const newBook = new Book({ title, author, publishedDate, pages, genre, description, image });
    await newBook.save();

    res.status(201).send(newBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });

    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send(updatedBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send(deletedBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
};



export const addReview = async (req, res, next) => {
  const { id } = req.params;
  const { review, rating } = req.body;
  const { username } = req.user;  // Get username from the authenticated user

  console.log('Review Data:', { id, review, rating, username }); // Debugging line

  try {
    const book = await Book.findById(id);
    if (!book) return next(errorHandler(404, 'Book not found'));

    book.reviews.push({ text: review, rating, username });
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.log('Error adding review:', error); // Debugging line
    next(error);
  }
};





export const searchBooksByTitle = async (req, res) => {
  const query = req.query.query;

  try {
    const books = await Book.find({ title: { $regex: query, $options: 'i' } });

    if (!books || books.length === 0) {
      return res.status(404).send('No books found matching the search criteria.');
    }

    res.status(200).send(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};