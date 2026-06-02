import { useState } from 'react';

import {
  Package,
  Settings,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  useAuth,
  useCart,
} from '../../context/usecontext';
import { OrderHistory } from './components/orderhistory';
import { Setting } from './components/settings';
import { UserProfile } from './components/userProfile';

export const MyAccount = () => {
  const { cart, addDeliveryDetails, clearCart } = useCart();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [isActive, setIsActive] = useState("profile");

  return (
    <div className="flex flex-col items-center max-w-screen px-2.5 py-4  sm:px-10 lg:px-10 sm:py-6">
      <div className=" flex flex-col gap-2 w-full font-semibold text-base md:text-lg lg:text-xl md:w-175 lg:w-225 bg-gray-900 rounded-xl my-3">
        <div
          onClick={() => setIsActive("profile")}
          className={`flex gap-3 items-center cursor-pointer py-5 px-4 rounded-t-xl ${isActive === "profile" ? "bg-orange-400/10 text-orange-400 border-r-4 border-orange-400 " : ""}`}
        >
          <User />
          <p>Profile</p>
        </div>
        <div
          onClick={() => setIsActive("order")}
          className={`flex gap-3 items-center cursor-pointer py-5 px-4 ${isActive === "order" ? "bg-orange-400/10 text-orange-400 border-r-4 border-orange-400 " : ""}`}
        >
          <Package />
          <p>Order History</p>
        </div>
        <div
          onClick={() => setIsActive("setting")}
          className={`flex gap-3 items-center cursor-pointer py-5 px-4 rounded-b-xl ${isActive === "setting" ? "bg-orange-400/10 text-orange-400 border-r-4 border-orange-400 " : ""}`}
        >
          <Settings />
          <p>Settings</p>
        </div>
      </div>

      {isActive === "profile" && <UserProfile />}
      {isActive === "order" && <OrderHistory />}
      {isActive === "setting" && <Setting />}
    </div>
  );
};
