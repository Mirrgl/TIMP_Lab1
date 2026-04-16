import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Form from "./pages/Form/Form";
import ProtectedRoute from "./utilities/protectedRoutes";
import Login from "./pages/Login/Login";
import WrongPage from "./pages/WrongPage/WrongPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/add" element={<Form />} />
        </Route>

        <Route path="*" element={<WrongPage />} />
      </Routes>
    </Router>
  );
};

export default App;
