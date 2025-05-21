import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./Main"
import Signup from "./Signup"
import Login from "./Login"


function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}
export default App