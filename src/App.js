import { Provider } from "react-redux";
import Controls from "./Controls";
import Navbar from "./Navbar";
import Type from "./Type";
import store from './redux/store'
import Result from "./Result";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./About";
import Login from "./Login";
function App() {
  return (

    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Type/>}></Route>
            <Route path="/result" element={<Result/>}></Route>
            <Route path="/info" element={<About/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </Router>
      </div>

    </Provider>
  );
}

export default App;
