import styles from './Card.module.css'
import pencilIcon from '../../images/pencil.png'
import trashIcon from '../../images/trash.png'

export default function Card({ id, name, hosts, status, onEdit, onDelete }) {

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <h3 className={styles.text}>Охранники на КПП:</h3>
        {hosts.join(', ')}
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
