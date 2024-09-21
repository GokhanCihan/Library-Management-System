import instance from "./instance";

export const findAll = () => instance.get("/categories");

export const find = (id) => instance.get(`/categories/${id}`);

export const create = (data) => instance.post("/categories", data);

export const update = (id, data) => instance.put(`/categories/${id}`, data);

export const remove = (id) => instance.delete(`/categories/${id}`);

