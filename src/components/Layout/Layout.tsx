import type { ReactNode } from "react"
import { NavLink } from "react-router"
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.page}>
      <nav className={styles.page__nav}>
        <NavLink className={styles.page__link} to={"/shuffler"}>
          Text Shuffler
        </NavLink>
        <NavLink className={styles.page__link} to={"/pesel-validator"}>
          Pesel Validator
        </NavLink>
        <NavLink className={styles.page__link} to={"/user-manager"}>
          User manager
        </NavLink>
      </nav>
      {children}
    </div>
  );
}