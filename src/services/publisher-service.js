import instance from "./instance";

export const findAll = () => instance.get("/publishers");

export const find = (id) => instance.get(`/publishers/${id}`);

export const create = (data) => instance.post("/publishers", data);

export const update = (id, data) => instance.put(`/publishers/${id}`, data);

export const remove = (id) => instance.delete(`/publishers/${id}`);