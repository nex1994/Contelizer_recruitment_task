import { Navigate, Route, Routes } from "react-router"
import { TextShuffler } from "./components/TextShuffler";
import './App.scss';
import { PeselValidator } from "./components/PeselValidator";
import { UserManager } from "./components/UserManager";

export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={"shuffler"} />} />
        <Route path="/shuffler" element={<TextShuffler />} />
        <Route path="/pesel-validator" element={<PeselValidator />}/>
        <Route path="/user-manager" element={<UserManager />}/>
      </Route>
    </Routes>
  );
} 

