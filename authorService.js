import { authors } from "./author.js";

import { books } from "./book.js";
import EventBus from "./eventBus.js";

EventBus.subscribe("deleteAuthor", (data) => {
  books.find((book) => book.authorId === data).authorId = null
})

export const authorService = {

  getAllAuthors: () => {
    return authors;
  },

  getAuthorById: (id) => {
    return authors.find((author) => author.id === id);
  },

  createAuthor: (name) => {
    const newAuthor = {
      id: authors.length + 1,
      name
    };
    authors.push(newAuthor);
    return newAuthor;
  },

  updateAuthor: (id, name) => {
    const author = authors.find((author) => author.id === id);
    if (author) {
      author.name = name;
      return author;
    }
    return null;
  },

  deleteAuthor: (id) => {

    const index = authors.findIndex((author) => author.id === id);
    if (index !== -1) {
      authors.splice(index, 1);
      EventBus.publish("delete", id)
      return true;
    }
    return false;
  }
};
