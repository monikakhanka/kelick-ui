import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Payroll from "./components/Payroll";
import Leaves from "./components/Leaves";
import Claims from "./components/Claims";
import Employees from "./components/Employees";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/employees" element={<Employees />}></Route>
            <Route path="/payroll" element={<Payroll />}></Route>
            <Route path="/leaves" element={<Leaves />}></Route>
            <Route path="/claims" element={<Claims />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
