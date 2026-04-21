import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
} from "../services/tarefasService";

export function useTarefas() {
  const queryClient = useQueryClient();

  const tarefas = useQuery({
    queryKey: ["tarefas"],
    queryFn: async () => {
      const { data } = await getTarefas();
      return data;
    },
  });

 const criar = useMutation({
  mutationFn: criarTarefa,
  onSuccess: () => {
    queryClient.invalidateQueries(["tarefas"]);
    toast.success("Tarefa criada!");
  },
});

const atualizar = useMutation({
  mutationFn: ({ id, data }) => atualizarTarefa(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries(["tarefas"]);
    toast.success("Tarefa atualizada!");
  },
});
 const deletar = useMutation({
  mutationFn: deletarTarefa,
  onSuccess: () => {
    queryClient.invalidateQueries(["tarefas"]);
    toast.success("Tarefa removida!");
  },
});
  return { tarefas, criar, atualizar, deletar };
}