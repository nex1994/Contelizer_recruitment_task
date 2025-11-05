import type { ReactNode } from "react"
import { Link, NavLink } from "react-router"
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.page}>
      <nav className={styles.page__nav}>
        <Link to={"/"}>
          <img src="/logo.png" />
        </Link>
        <div className={styles.page__buttons}>
          <NavLink className={styles.page__link} to={"/szyfrak"}>
            Szyfrak
          </NavLink>
          <NavLink className={styles.page__link} to={"/walidator-pesel"}>
            Walidator PESEL
          </NavLink>
          <NavLink className={styles.page__link} to={"/lista-urzytkownikow"}>
            Lista urzytkowników
          </NavLink>
        </div>
      </nav>
      {children}
    </div>
  );
}