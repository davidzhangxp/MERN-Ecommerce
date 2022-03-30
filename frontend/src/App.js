import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/product/:slug" element={<ProductScreen />}></Route>
          </Routes>
        </main>
        <footer className="row center">Copyright 2022</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
