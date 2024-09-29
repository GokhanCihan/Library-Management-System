import instance from "./instance";

export const findAll = () => instance.get("/api/v1/publishers");

export const find = (id) => instance.get(`/api/v1/publishers/${id}`);

export const create = (data) => instance.post("/api/v1/publishers", data);

export const update = (id, data) => instance.put(`/api/v1/publishers/${id}`, data);

export const remove = (id) => instance.delete(`/api/v1/publishers/${id}`);