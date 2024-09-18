import instance from "./instance";

export const findAll = () => instance.get("/authors");

export const find = (id) => instance.get(`/authors/${id}`);

export const create = (data) => instance.post("/authors", data);

export const update = (id, data) => instance.put(`/authors/${id}`, data);

export const remove = (id) => instance.delete(`/authors/${id}`);

