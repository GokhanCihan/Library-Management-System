import instance from "./instance";

export const findAll = () => instance.get("/books");

export const find = (id) => instance.get(`/books/${id}`);

export const create = (data) => instance.post("/books", data);

export const update = (id, data) => instance.put(`/books/${id}`, data);

export const remove = (id) => instance.delete(`/books/${id}`);

