import Header from "./app/screens/header";
import Footer from "./app/screens/footer";
import HomeScreen from "./app/screens/home-screen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartScreen } from "./app/screens/cartScreen";
import SignIn from "./app/screens/signin";
import SignOut from "./app/screens/logout";
import { cartItemsAll } from "./store/cartSlice";
import { useSelector } from "react-redux";
import { getUser } from "./store/userSlice";
import SignUp from "./app/screens/signup";
function App() {
  const cartItems = useSelector(cartItemsAll);
  const { user } = useSelector(getUser);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header user={user} cartItems={cartItems} />
        <main>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/cart" element={<CartScreen user={user} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<SignOut />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
