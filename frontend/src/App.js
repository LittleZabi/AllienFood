import Header from "./app/screens/header";
import Footer from "./app/screens/footer";
import HomeScreen from "./app/screens/home-screen";
import OrderScreen from "./app/screens/order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartScreen } from "./app/screens/cartScreen";
import SignIn from "./app/screens/signin";
import SignOut from "./app/screens/logout";
import { cartItemsAll } from "./store/cartSlice";
import { useSelector } from "react-redux";
import { getUser } from "./store/userSlice";
import SignUp from "./app/screens/signup";
import { Shipping } from "./app/screens/shipping";
import { PaymentsScreen } from "./app/screens/payment";
import { PlaceorderScreen } from "./app/screens/placeorder";
import OrderHistory from "./app/screens/order-history";
import Profile from "./app/screens/profile";
function App() {
  const cartItems = useSelector(cartItemsAll);
  const { user } = useSelector(getUser);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header user={user} cartItems={cartItems} />
        <div className="bg-image">
          <img src="/media/images/anna-peipina-2j9hu.jpg" />
        </div>
        <main>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/view/:id/:cart" element={<HomeScreen />} />
            <Route path="/order/:slug" element={<OrderScreen />} />
            <Route path="/cart" element={<CartScreen user={user} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<SignOut />} />
            <Route path="/shipping" element={<Shipping user={user} />} />
            <Route path="/payment" element={<PaymentsScreen />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route
              path="/order-history"
              element={<OrderHistory user={user} />}
            />
            <Route
              path="/placeorder"
              element={<PlaceorderScreen user={user} />}
            />
            <Route path="/order/:slug" element={<OrderScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
