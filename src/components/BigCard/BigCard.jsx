import { Link } from "react-router-dom";
import styles from "./BigCard.module.css";

export default function Card({
  register,
  fields,
  errors,
  saveButtonText,
  onSubmit,
  onAddHost,
  onRemoveHost,
  isSubmitting,
  submitError,
  status,
  onToggleStatus,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.card}>
      <div className={styles.cardHeader}>
        <Link to="/" className={styles.cardTitle}>
          Назад
        </Link>

        <div className={styles.statusBlock}>
          <span className={styles.statusText}>Изменить статус</span>

          <button
            type="button"
            className={`${styles.statusButton} ${status ? styles.active : styles.inactive}`}
            onClick={onToggleStatus}
          >
            {status ? "Активный" : "Неактивный"}
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        <input
          type="text"
          className={styles.cardInput}
          placeholder="Название КПП"
          {...register("name", {
            required: "Пустое название КПП",
            pattern: {
              value: /^[А-ЯЁа-яё0-9-]+$/,
              message: "Неверное ФИО",
            },
          })}
        />

        {errors.name && (
          <p className={styles.errorText}>{errors.name.message}</p>
        )}

        <div className={styles.hostsBlock}>
          <h3 className={styles.hostsTitle}>ФИО Охранников</h3>

          <div className={styles.hostActions}>
            <button
              type="button"
              className={`${styles.button} ${styles.active}`}
              onClick={onAddHost}
            >
              Добавить
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id}>
              <div className={styles.hostRow}>
                <input
                  type="text"
                  placeholder="ФИО Охранника"
                  className={styles.cardInput}
                  {...register(`hosts.${index}.value`, {
                    required: "Пустое ФИО",
                    pattern: {
                      value: /^[А-ЯЁа-яё -]+$/,
                      message: "Неверное ФИО",
                    },
                  })}
                />

                <button
                  type="button"
                  className={`${styles.button} ${styles.inactive} ${styles.removeButton}`}
                  onClick={() => onRemoveHost(index)}
                  disabled={fields.length === 1}
                >
                  Удалить
                </button>
              </div>
              {errors.hosts?.[index]?.value && (
                <p className={styles.errorText}>
                  {errors.hosts?.[index]?.value.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={styles.saveButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Сохранение..."
          ) : submitError ? (
            <p style={{ color: "tomato" }}>Ошибка сохранения</p>
          ) : (
            saveButtonText
          )}
        </button>
      </div>
    </form>
  );
}
