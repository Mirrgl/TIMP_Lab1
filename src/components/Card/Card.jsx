import styles from "./Card.module.css";
import pencilIcon from "../../images/pencil.png";
import trashIcon from "../../images/trash.png";
import { formatTimeSinceShift } from "../../utilities/timestamp";

export default function Card({
  id,
  name,
  hosts,
  status,
  alarm,
  shiftTime,
  traffic,
  onEdit,
  onDelete,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>

        <p className={styles.text}>
          Охранники на КПП:
          <span className={styles.valueBlock}>{hosts.join(", ")}</span>
        </p>

        <p className={styles.text}>Уровень тревоги: {alarm}</p>

        <p className={styles.text}>
          Время с последней смены:
          <span className={styles.valueBlock}>
            {formatTimeSinceShift(shiftTime)}
          </span>
        </p>

        <p className={styles.text}>Пропускная способность: {traffic}</p>
      </div>

      <div
        className={`${styles.status} ${status ? styles.statusActive : styles.statusInactive}`}
      >
        {status ? "Активный" : "Неактивный"}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Редактировать"
          onClick={() => onEdit(id)}
        >
          <img src={pencilIcon} alt="" className={styles.icon} />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Удалить"
          onClick={() => onDelete(id)}
        >
          <img src={trashIcon} alt="" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
