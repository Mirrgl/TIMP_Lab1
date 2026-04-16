import styles from "./Login.module.css";
import { useLoginForm } from "../../hooks/useLoginForm";
import { loginUser } from "../../utilities/fakeauth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { register, errors, onSubmit } = useLoginForm({
    checkLogin: loginUser,
    onSuccess: () => navigate("/"),
  });

  console.log(import.meta.env.VITE_LOGIN);
  console.log(import.meta.env.VITE_PASSWORD);

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Вход</h1>
          <p className={styles.subtitle}>Авторизация в системе КПП</p>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label htmlFor="login" className={styles.label}>
              Логин
            </label>
            <input
              id="login"
              type="text"
              className={styles.input}
              placeholder="Введите логин"
              {...register("login", {
                required: "Пустой логин",
              })}
            />
            {errors.login && (
              <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>
                {errors.login?.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Введите пароль"
              {...register("password", {
                required: "Пустой пароль",
              })}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>
                {errors.password?.message}
              </p>
            )}
          </div>

          {errors.root?.serverError && (
            <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>
              {errors.root?.serverError.message}
            </p>
          )}

          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}
