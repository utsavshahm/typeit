import { Provider } from "react-redux";
import Home from "./pages/Home/Home";
import store from './redux/store'
import Result from "./pages/Result/Result";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import AccountPage from "./pages/Account/AccountPage";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
  return (

    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/result" element={<Result/>}></Route>
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
