import { useState, type FormEventHandler } from "react";
import { patchUser } from "../../../api/users";

type Params = {
  name: string;
  id: number;
  email: string;
  gender: string;
  status: string;
};

export const SingleUser = ({ name, id, email, gender, status }: Params) => {
  const [newName, setNewName] = useState<string>('');
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
  }

  return (
    <>
      {!beingEdited ? (
        <li onDoubleClick={handleEdit}>
          {name}
        </li>
      ) : (
        <form onSubmit={handleEditsubmit}>
          <input
            type="text"
            onKeyUp={(event) => event.key === "Escape" && setBeingEdited(false)}
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
            autoFocus
            onBlur={handleEditsubmit}
          />
        </form>
      )}
    </>
  );
}