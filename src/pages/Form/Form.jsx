import BigCard from "../../components/BigCard/BigCard";
import { useCheckpointForm } from "../../hooks/useCheckpointForm";
import { useNavigate } from "react-router-dom";
import { api } from "../../utilities/api";

export default function Form() {
  const navigate = useNavigate()

  const form = useCheckpointForm({
    initialData: null,
    onSave: async (formData) => {
      await api.post("/checkpoints", formData);
      navigate("/")
    },
  });

  return (
    <BigCard
      saveButtonText="Добавить"
      {...form}
    />
  );
}