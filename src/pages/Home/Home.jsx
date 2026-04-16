import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { logoutUser } from "../../utilities/fakeauth";
import { api } from "../../utilities/api";
import reloadIcon from "../../images/reload.png";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [checkpoints, setCheckpoints] = useState([]);
  const [needReload, setNeedReload] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  async function loadData() {
    try {
      setIsLoading(true);
      const response = await api.get("/checkpoints");
      setCheckpoints(response.data);
      console.log("Данные загружены", response.data);
    } catch (error) {
      setIsError(true);
      console.error("Ошибка запроса:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete(id) {
    try {
      await api.delete(`/checkpoints/${id}`);

      setCheckpoints((prev) =>
        prev.filter((checkpoint) => checkpoint.id !== id),
      );
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setIsError(false);
    loadData();
  }, [needReload]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className={styles.homePage}>
      <div className={styles.homeHeader}>
        <div className={styles.homeTitleBlock}>
          <span className={styles.homeSubtitle}>Панель контроля</span>
          <h1 className={styles.homeTitle}>Список КПП</h1>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={() => setNeedReload((prev) => !prev)}
          >
            <img src={reloadIcon} alt="" className={styles.icon} />
          </button>

          <button
            type="button"
            className={styles.addCheckpointButton}
            onClick={() => navigate("/add")}
            disabled={isError}
          >
            + Добавить КПП
          </button>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>

      <section className={styles.homeListWrapper}>
        <ul className={styles.homeList}>
          {isError && <h1>База данных не доступна</h1>}
          {!isError &&
            checkpoints.map((checkpoint) => (
              <li key={checkpoint.id}>
                <Card
                  {...checkpoint}
                  onEdit={() => navigate(`/detail/${checkpoint.id}`)}
                  onDelete={onDelete}
                />
              </li>
            ))}
        </ul>
      </section>
    </section>
  );
}
