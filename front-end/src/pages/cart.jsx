import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { CsButton } from "../component/button";
import { useCart, useAuth } from "../context/usecontext";

export const CartDetails = () => {
  const { cart, cartCount, removeFromCart, addToCart, setCart } = useCart();
  const {user, setShowLoginModal} = useAuth();

  const navigate = useNavigate();

  const handleCheckOut = ()=>{
    if(!user){
      setShowLoginModal(true);
      console.log(user);
      return;
    };
    navigate("/checkout");
  };

  // function to delete from cart
  const handleDelete = (data, name) => {
    removeFromCart(data);
    toast.success(`${name} removed`);
  };

  // function to increase and decrease cart items to cart
  const handleInc = (id, num) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        // make sure the quantity do not go below 1 then increse it..
        const newQuantity = Math.max(1, item.quantity + num);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCart(updated);
  };

  const handleDecrease = (id, num) => {
    const updatedQt = cart.map((item) => {
      if (item.id === id) {
        // make sure the quantity do not go below 1 then increse it..
        const newQuantity = Math.max(1, item.quantity - num);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setCart(updatedQt);
  };

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const DeliveryFee = 1500;
  return (
    <div className="px-2.5 py-4 sm:px-10 lg:px-10 sm:py-6">
      {cart.length <= 0 && (
        <main className="flex flex-col items-center justify-center gap-3 h-dvh mb-10 ">
          <div className="flex items-center justify-center rounded-full p-7 bg-orange-400/10 border border-orange-400/60">
            <ShoppingCart className="w-25 h-25 text-orange-400/75" />
          </div>
          <div className="flex flex-col items-center text-center gap-3 my-3 sm:w-1/2">
            <h2 className="text-2xl sm:text-5xl text-orange-400/75 font-semibold">
              Your Cart is Empty
            </h2>
            <p className="text-lg sm:text-xl font-semibold lg:w-3/4">
              Looks like you haven't added any delicious items yet.
            </p>
          </div>
          <CsButton
            text={"Start Shopping"}
            Icon={ArrowRight}
            action={() => navigate("/menu")}
            className={`flex flex-row-reverse justify-center items-center gap-1 py-3 px-4 rounded-xl bg-orange-400/90 text-black/90 font-medium text-sm sm:text-lg hover:bg-orange-400/80 translate-colors duration-300`}
          />
        </main>
      )}
      {cart.length >= 1 && (
        <div className="px-2.5 py-4 sm:px-10 lg:px-10 sm:py-6">
          <div className="flex items-center gap-2 w-fit text-center py-1.5 px-2.5 rounded-full bg-orange-400/10 text-sm sm:text-lg text-orange-400/90 font-medium border border-orange-400/30">
            <ShoppingCart className="w-3 h-3" />
            <p className="font-medium">Shopping Cart</p>
          </div>
          <div className="flex flex-col gap-2 font-medium my-3">
            <h2 className="text-3xl md:text-4xl text-orange-400/90">
              Your Cart
            </h2>
            <p className="px-2 text-sm sm:text-lg">
              {cartCount} item ready for checkout
            </p>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-4 ">
            <div className="flex flex-col items-center w-full gap-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex flex-wrap sm:flex-nowrap gap-3 p-5 border border-orange-400/40 rounded-xl bg-gray-400/10"
                >
                  <div className="w-full sm:w-52 h-32.5 sm:h-40 border border-orange-400/50  rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {/* details */}
                  <div className="flex flex-col gap-2 justify-between w-full">
                    <p className="text-orange-400/90 font-semibold text-2xl sm:text-4xl">
                      {item.name}
                    </p>
                    <div className="flex items-center justify-center py-1 px-2.5 w-fit bg-orange-400/10 rounded-full border border-orange-400/40">
                      <p className="text-sm sm:text-lg ">{item.category}</p>
                    </div>
                    {/* controls */}
                    <div className="flex justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <CsButton
                          Icon={Minus}
                          state={item.quantity <= 1}
                          action={() => handleDecrease(item.id, 1)}
                          className={`${item.quantity <= 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"} text-orange-400/75 font-semibold border border-orange-400/75 rounded-lg p-2 bg-gray-400/10  hover:bg-orange-400/50`}
                        />
                        <p>{item.quantity}</p>
                        <CsButton
                          Icon={Plus}
                          action={() => handleInc(item.id, 1)}
                          className={`text-orange-400/75 font-semibold border border-orange-400/75 rounded-lg p-2 bg-gray-400/10  hover:bg-orange-400/50`}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-orange-400/90 text-lg sm:text-2xl font-semibold">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <div
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-2 cursor-pointer hover:bg-red-400/30 bg-red-400/10 text-red-500 border border-red-400/60 rounded-xl "
                        >
                          <Trash2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <CsButton
                text={`Continue Shopping`}
                action={() => navigate("/menu")}
                className={`flex flex-row-reverse items-center justify-center w-full gap-1.5 text-lg md:text-xl hover:bg-orange-400/30 text-orange-400/80 bg-gray-400/10 border border-orange-400/90 mt-4 rounded-xl font-bold p-4`}
              />
            </div>
            {/* order summary */}
            <div className="w-full max-h-fit lg:w-137.5 flex flex-col gap-3 p-5 border border-orange-400/40 rounded-xl bg-gray-400/10 ">
              <div className="flex items-center gap-1 mt-3 text-lg sm:text-xl text-orange-400/90 font-semibold">
                <Sparkles className="w-5 h-5" />
                <p>Order Summary</p>
              </div>
              <div className="flex flex-col gap-5 my-2 border-b border-orange-400/50 pb-9">
                <div className="flex justify-between items-center text-lg font-medium bg-black/70 p-3 rounded-xl">
                  <p className="text-gray-300/50">Subtotal</p>
                  <p>₦{subTotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg font-medium bg-black/70 p-3 rounded-xl">
                  <p className="text-gray-300/50">Delivery Fee</p>
                  <p>₦{DeliveryFee.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-lg font-medium bg-orange-400/15 border border-orange-400/50 p-3 rounded-xl text-white/90 mt-2">
                <p className="text-lg">Total</p>
                <p className="text-orange-400/90 text-2xl">
                  ₦{(subTotal + DeliveryFee).toLocaleString()}
                </p>
              </div>
              <CsButton
                text={`Proceed to Checkout`}
                Icon={ArrowRight}
                iconColor={`font-extrabold w-4.5 h-4.5`}
                action={handleCheckOut}
               // action={() => navigate("/checkout")}
                className={`flex flex-row-reverse items-center justify-center gap-1.5 text-lg md:text-xl hover:bg-orange-400/95 text-black/80 bg-orange-400/85 mt-4 rounded-xl font-bold p-4`}
              />
              <p className="text-center text-gray-300/40">
                Secure checkout powered by PayStack
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
