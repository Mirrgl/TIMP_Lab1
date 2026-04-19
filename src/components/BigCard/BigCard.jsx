import { Link } from "react-router-dom";
import styles from "./BigCard.module.css";
import HostsList from "./Hosts";
import { useFormState } from "react-hook-form";

export default function Card({
  register,
  control,
  fields,
  saveButtonText,
  onSubmit,
  onAddHost,
  onRemoveHost,
  isSubmitting,
  submitError,
  status,
  onToggleStatus,
}) {
  const { errors } = useFormState({
    control,
    name: "name"
  })

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
              message: "Неверное название КПП",
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
            <HostsList
              key={field.id}
              field={field}
              index={index}
              onRemoveHost={onRemoveHost}
              control={control}
              register={register}
              fieldsLength={fields.length}
            />
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
            <span style={{ color: "tomato" }}>Ошибка сохранения</span>
          ) : (
            saveButtonText
          )}
        </button>
      </div>
    </form>
  );
}
