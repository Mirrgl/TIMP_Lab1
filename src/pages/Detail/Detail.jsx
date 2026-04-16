import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigCard from "../../components/BigCard/BigCard.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import { useCheckpointForm } from "../../hooks/useCheckpointForm.jsx";
import { api } from "../../utilities/api.jsx";

function BigCardWithForm({ checkpoint, id }) {
  const form = useCheckpointForm({
    initialData: checkpoint,
    onSave: async (formData) => {
      await api.put(`/checkpoints/${id}`, formData);
    },
  });

  return <BigCard saveButtonText="Сохранить" {...form} />;
}

export default function Detail() {
  const [loading, setLoading] = useState(true);
  const [isErrorLoading, setErrorLoading] = useState(false);
  const { id } = useParams();
  const [checkpoint, setCheckpoint] = useState(null);

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        const response = await api.get(`/checkpoints/${id}`);

        setCheckpoint({
          name: response.data?.name ?? "",
          status: response.data?.status ?? false,
          hosts: Array.isArray(response.data?.hosts) ? response.data.hosts : [],
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

  if (loading || isErrorLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <BigCardWithForm checkpoint={checkpoint} id={id} />
    </div>
  );
}
