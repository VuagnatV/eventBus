// categoryService.js
import { categories } from "./category.js";
import { books } from "./book.js";
import EventBus from "./eventBus.js";

EventBus.subscribe("deleteCategory", (data) => {
  books.find((book) => book.categoryId === data).categoryId = null
})

export const categoryService = {
  getAllCategories: () => {
    return categories;
  },

  getCategoryById: (id) => {
    return categories.find((category) => category.id === id);
  },

  createCategory: (name) => {
    const newCategory = {
      id: categories.length + 1,
      name
    };
    categories.push(newCategory);
    return newCategory;
  },

  updateCategory: (id, name) => {
    const category = categories.find((category) => category.id === id);
    if (category) {
      category.name = name;
      return category;
    }
    return null;
  },

  deleteCategory: (id) => {
    const index = categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      categories.splice(index, 1);
      EventBus.publish("deleteCategory", id)
      return true;
    }
    return false;
  }
};
