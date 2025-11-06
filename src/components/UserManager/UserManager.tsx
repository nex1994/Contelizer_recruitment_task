import { useEffect, useMemo, useState } from "react"
import { Layout } from "../Layout"
import { getUsers } from "../../api/users"
import type { Status, User } from "../../utils/types/user"
import { SingleUser } from "./components/SingleUser"

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
      <main>
        <h1>Lista Użytkowników</h1>
          <input 
            type="text" 
            placeholder="Wyszukaj użytkownika"
            value={query}
            onChange={(event) => setQuery(event.target.value.trimStart())}
             />
          <ul>
            {status === 'resolved' && filteredUsers.map(user => {
              return (
                <SingleUser 
                  id={user.id} 
                  name={user.name}
                  email={user.email}
                  gender={user.gender}
                  status={user.status}
                   />
              )
            })}
          </ul>
      </main>
    </Layout>
  )
}