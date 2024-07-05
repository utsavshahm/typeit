import { Provider } from "react-redux";
import Type from "./pages/Home/Type";
import store from './redux/store'
import Result from "./pages/Result/Result";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import AccountPage from "./pages/Account/AccountPage";
function App() {
  return (

    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Type/>}></Route>
            <Route path="/result" element={<Result/>}></Route>
            <Route path="/info" element={<About/>}></Route>
            <Route path="/login" element={<AccountPage/>}></Route>
          </Routes>
        </Router>
      </div>

    </Provider>
  );
}

export default App;
