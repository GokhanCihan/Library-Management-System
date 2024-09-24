import instance from "./instance";

export const findAll = () => instance.get("/borrows");

export const find = (id) => instance.get(`/borrows/${id}`);

export const create = (data) => instance.post("/borrows", data);

export const update = (id, data) => instance.put(`/borrows/${id}`, data);

export const remove = (id) => instance.delete(`/borrows/${id}`);