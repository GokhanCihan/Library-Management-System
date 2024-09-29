import instance from "./instance";

export const findAll = () => instance.get("/api/v1/authors");

export const find = (id) => instance.get(`/api/v1/authors/${id}`);

export const create = (data) => instance.post("/api/v1/authors", data);

export const update = (id, data) => instance.put(`/api/v1/authors/${id}`, data);

export const remove = (id) => instance.delete(`/api/v1/authors/${id}`);

