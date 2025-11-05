import { Navigate, Route, Routes } from "react-router"
import { TextShuffler } from "./components/TextShuffler";
import './App.scss';
import { PeselValidator } from "./components/PeselValidator";
import { UserManager } from "./components/UserManager";

export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={"szyfrak"} />} />
        <Route path="/szyfrak" element={<TextShuffler />} />
        <Route path="/walidator-pesel" element={<PeselValidator />}/>
        <Route path="/lista-urzytkownikow" element={<UserManager />}/>
      </Route>
    </Routes>
  );
} 

