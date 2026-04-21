import { api } from "./api";

export const getTarefas = () => api.get("/tarefas");

export const criarTarefa = (data) =>
  api.post("/tarefas", data);

export const atualizarTarefa = (id, data) =>
  api.put(`/tarefas/${id}`, data);

export const deletarTarefa = (id) =>
  api.delete(`/tarefas/${id}`);