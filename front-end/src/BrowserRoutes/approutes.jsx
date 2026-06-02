import {
  Route,
  Routes,
} from 'react-router';

import { Layout } from '../layouts/layout';
import { AboutUs } from '../pages/about';
import { AdminDashboard } from '../pages/admin/admin_dashboard';
import { ManageMeal } from '../pages/admin/manage_meals';
import { CartDetails } from '../pages/cart';
import { CheckOut } from '../pages/checkoutpage';
import { ContactUs } from '../pages/contact';
import { Home } from '../pages/home';
import { Menu } from '../pages/menu';
import { Orderdetails } from '../pages/order';
import { MyAccount } from '../pages/userAccount/my_account';
import { ProtectedRoutes } from './protectedRoutes';

export const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu/:id" element={<Orderdetails />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoutes allowedRole={"customer"}>
              <CheckOut />{" "}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoutes allowedRole={"customer"}>
              <MyAccount />{" "}
            </ProtectedRoutes>
          }
        />
      </Route>

      <Route path="/admin" element={<Layout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage_meals" element={<ManageMeal />} />
      </Route>
    </Routes>
  );
};
