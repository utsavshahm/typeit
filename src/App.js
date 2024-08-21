import { Provider } from "react-redux";
import Home from "./pages/Home/Home";
import store from './redux/store'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import AccountPage from "./pages/Account/AccountPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import ShowResult from "./pages/Result/ShowResult";
function App() {

  const [result, isResult] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem("testTaken")) {
      isResult(true);
    }
  }, [])

  return (

    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/result" element={<ShowResult/>}></Route>
            <Route path="/info" element={<About/>}></Route>
            <Route path="/login" element={<AccountPage/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Routes>
        </Router>
      </div>

    </Provider>
  );
}

export default App;
