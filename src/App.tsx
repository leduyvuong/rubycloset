import "./App.css";
import Home from "./components/Customer/Home/Home";
import ViewLogin from "./components/Customer/ViewLogin/ViewLogin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from "./components/Customer/Single-product/ProductDetail";
import Cart from "./components/Customer/cart_view/Cart";
import Checkout from "./components/Customer/Checkout/Checkout";
import Sidebar from "./components/Admin/SidebarAdmin/Sidebar";
import Header from "./components/Customer/Header";
import Footer from "./components/Customer/Footer";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import HeaderAdmin from "./components/Admin/SidebarAdmin/HeaderAdmin";
import UserProfile from "./components/UserProfile/UserProfile";
import ProductList from "./components/Admin/Product/ProductList";
import ProductList1 from "./components/Customer/product_list/ProductList";
import SingleProduct from "./components/Admin/Product/SingleProduct";
function App() {
  const [user, setUser] = useState({
    token: "",
    username: "",
    role: ""
  })

  useEffect(() => {
    if (localStorage.getItem("user")) {

      axios.get("https://rubyclosetapi.herokuapp.com/api/v1/login", {
        headers: { "Authenticate": JSON.parse(localStorage.getItem("user") || "").token }
      })
        .then(res => {
          let resJson = JSON.parse(JSON.stringify(res.data));
          if (!resJson.login) {
            localStorage.removeItem("user");
            window.location.reload();
          } else {
            setUser(resJson.user);
          }
        })
    }
  }, [localStorage.getItem("user")])

  return (
    <div className="App" >
      {user.role == "admin" ? (
        <Router>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div className="col-md-10">
              <HeaderAdmin />
              <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route path="/admin/users/:id" component={UserProfile} />
                <Route path="/admin/newUser" component={UserProfile} />
                <Route path="/admin/products" component={ProductList} />
                <Route path="/admin/newProduct" component={SingleProduct} />
                <Route path="/admin/product_detail/:id" component={SingleProduct} />
              </Switch>
            </div>
          </div>
        </Router>
      ) : (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={ViewLogin} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/users/:id" component={UserProfile} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/products" component={ProductList1} />
          </Switch>
          <Footer />
        </Router>
      )
      }


    </div >
  );
}

export default App;
