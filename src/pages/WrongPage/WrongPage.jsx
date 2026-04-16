import { Link } from "react-router-dom";
import styles from "./WrongPage.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Такой страницы не существует</p>
      <Link to="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
}
