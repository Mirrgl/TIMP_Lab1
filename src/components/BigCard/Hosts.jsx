import styles from "./BigCard.module.css";
import { useFormState } from "react-hook-form";

export default function HostsList({
  field,
  control,
  index,
  register,
  fieldsLength,
  onRemoveHost,
}) {
  const { errors } = useFormState({
    control,
    name: `hosts.${index}.value`,
  });

  const error = errors.hosts?.[index]?.value;

  return (
    <div>
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
          disabled={fieldsLength === 1}
        >
          Удалить
        </button>
      </div>
      {error && <p className={styles.errorText}>{error.message}</p>}
    </div>
  );
}
