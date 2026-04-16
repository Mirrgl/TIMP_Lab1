import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigCard from "../../components/BigCard/BigCard.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import { useCheckpointForm } from "../../hooks/useCheckpointForm.jsx"
import { api } from "../../utilities/api.jsx";

export default function Detail() {
  const [loading, setLoading] = useState(true);
  const [isErrorLoading, setErrorLoading] = useState(false);
  const { id } = useParams();
  const [checkpoint, setCheckpoint] = useState(null)

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        const response = await api.get(
          `/checkpoints/${id}`,
        );

        setCheckpoint(() => {
          const { id, ...info } = response.data
          return info
        });
      } catch (error) {
        setErrorLoading(true);
        console.error("Ошибка загрузки: ", error);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  const form = useCheckpointForm({
    initialData: checkpoint,
    onSave: async (formData) => {
      await api.put(`/checkpoints/${id}`, formData);
    },
  });

  if (loading || isErrorLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <BigCard
        saveButtonText="Сохранить"
        {...form}
      />
    </div>
  );
}
