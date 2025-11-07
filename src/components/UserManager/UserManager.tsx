import { useEffect, useMemo, useState } from "react"
import { Layout } from "../Layout"
import { getUsers } from "../../api/users"
import type { Status, User } from "../../utils/types/user"
import { SingleUser } from "./components/SingleUser"
import styles from './UserManager.module.scss';

export const UserManager = () => {
  const [users, setUsers] = useState<User[]>([])
  const [status, setStatus] = useState<Status>('idle');
  const [query, setQuery] = useState<string>('');
  




  const loadUsers = () => {
    return getUsers()
      .then(data => {
        setUsers(data)
        setStatus('resolved')
      })
      .catch(() => console.log('Couldnt load users.'))
  }

  const filteredUsers = useMemo(() => {
    const filtered = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))

    return filtered
  }, [query, users])

  useEffect(() => {
    setStatus('pending');
    loadUsers();
  }, [])

  return (
    <Layout>
      <main className={styles.page}>
        <h1 className={styles.page__header}>Lista Użytkowników</h1>
        <label className={styles.page__label} htmlFor="query">
          <input
            autoFocus
            className={styles.page__input}
            id="query"
            name="query"
            type="text"
            placeholder="Wyszukaj użytkownika"
            value={query}
            onChange={(event) => setQuery(event.target.value.trimStart())}
          />
        </label>
        <ul className={styles.page__list}>
          {status === "resolved" &&
            filteredUsers.map((user) => {
              return (
                <SingleUser
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  gender={user.gender}
                  status={user.status}
                />
              );
            })}
        </ul>
      </main>
    </Layout>
  );
}