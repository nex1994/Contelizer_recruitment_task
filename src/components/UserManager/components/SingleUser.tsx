import { useState, type FormEventHandler } from "react";
import { patchUser } from "../../../api/users";
import styles from './SingleUser.module.scss';

type Params = {
  name: string;
  id: number;
  email: string;
  gender: string;
  status: string;
};

export const SingleUser = ({ name, id, email, gender, status }: Params) => {
  const [newName, setNewName] = useState<string>(name);
  const [beingEdited, setBeingEdited] = useState<boolean>(false);
  

  const handleEdit = () => {
    setBeingEdited(true);
  };

  const handleEditsubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (newName === name) {
      setBeingEdited(false);

      return;
    }

    patchUser(id, {id, name: newName, email, gender, status})
      .then(() => setBeingEdited(false))
    
  }

  return (
    <div className={styles.page}>
      {!beingEdited ? (
        <div className={styles.page__container}>
          <li className={styles.page__list} onDoubleClick={handleEdit}>
            {newName}
          </li>
          <img
            onClick={() => setBeingEdited(true)}
            className={styles.page__image}
            src="./edit.png"
            alt="edit-image"
          />
        </div>
      ) : (
        <form onSubmit={handleEditsubmit}>
          <label className={styles.page__label} htmlFor="input">
            <input
              className={styles.page__input}
              id="input"
              name="input"
              type="text"
              onKeyUp={(event) =>
                event.key === "Escape" && setBeingEdited(false)
              }
              onChange={(event) => setNewName(event.target.value)}
              value={newName}
              autoFocus
              onBlur={handleEditsubmit}
            />
          </label>
        </form>
      )}
    </div>
  );
}