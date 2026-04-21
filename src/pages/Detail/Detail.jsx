import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BigCard from "../../components/BigCard/BigCard.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import { useCheckpointForm } from "../../hooks/useCheckpointForm.jsx";
import { api } from "../../utilities/api.jsx";

function BigCardWithForm({ checkpoint, id, navigate }) {
  const form = useCheckpointForm({
    initialData: checkpoint,
    onSave: async (formData) => {
      await api.put(`/checkpoints/${id}`, formData);
      navigate("/");
    },
  });

  return <BigCard saveButtonText="Сохранить" {...form} />;
}

export default function Detail() {
  const navigate = useNavigate();
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
          alarm: response.data?.alarm ?? "Отсутствует",
          traffic: response.data?.traffic ?? "Средняя",
          shiftTime: response.data?.shiftTime ?? "",
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

  if (loading) {
    return <Spinner />;
  }

  if (isErrorLoading) {
    return navigate("/wrongPage");
  }

  return (
    <div>
      <BigCardWithForm checkpoint={checkpoint} id={id} navigate={navigate} />
    </div>
  );
}
