import { Link } from "react-router-dom";
import styles from "./BigCard.module.css";
import HostsList from "./Hosts";
import { useFormState } from "react-hook-form";

const alarmOptions = [
  "Отсутствует",
  "Подозрительная активность",
  "Тревога",
];

const trafficOptions = ["Низкая", "Средняя", "Высокая"];

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
  alarm,
  traffic,
  onToggleStatus,
  onChangeAlarm,
  onChangeTraffic,
}) {
  const { errors } = useFormState({
    control,
  });

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
        <div className={styles.fieldBlock}>
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
        </div>

        <div className={styles.fieldBlock}>
          <p className={styles.fieldLabel}>Уровень тревоги</p>

          <div className={styles.segmentedControl}>
            {alarmOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.optionButton} ${
                  alarm === option ? styles.optionButtonSelected : ""
                }`}
                onClick={() => onChangeAlarm(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldBlock}>
          <p className={styles.fieldLabel}>Пропускная способность</p>

          <div className={styles.segmentedControl}>
            {trafficOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.optionButton} ${
                  traffic === option ? styles.optionButtonSelected : ""
                }`}
                onClick={() => onChangeTraffic(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.fieldLabel} htmlFor="shiftTime">
            Время последней смены
          </label>

          <input
            id="shiftTime"
            type="datetime-local"
            step="60"
            className={`${styles.cardInput} ${
              errors.shiftTime ? styles.cardInputError : ""
            }`}
            {...register("shiftTime", {
              required: "Укажи время последней смены",
              validate: {
                notFuture: (value) => {
                  if (!value) return true;
                  return (
                    new Date(value).getTime() <= Date.now() ||
                    "Время последней смены не может быть из будущего"
                  );
                },
                notPast: (value) => {
                  if (!value) return true;
                  return (
                    new Date(value).getTime() >= new Date(2024,0,1,0,0,0,0).getTime() || "Время последний смены не может быть раньше 2024 года"
                  )
                }
              },
            })}
          />

          {errors.shiftTime && (
            <div className={styles.errorCard}>
              <span className={styles.errorIcon}>!</span>
              <div>
                <p className={styles.errorTitle}>Проверь время смены</p>
                <p className={styles.errorText}>{errors.shiftTime.message}</p>
              </div>
            </div>
          )}
        </div>

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
