import Header from "./app/screens/header";
import Footer from "./app/screens/footer";
import HomeScreen from "./app/screens/home-screen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./app/screens/product-view";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/product/:id/:name" element={<HomeScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
