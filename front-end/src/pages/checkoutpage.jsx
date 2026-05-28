import { useState } from 'react';

import {
  CreditCard,
  Lock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { v7 as uuidv7 } from 'uuid';

import { CsButton } from '../component/button';
import {
  Form,
  FormHeader,
  FormInput,
  MessageArea,
} from '../component/form';
import {
  useAuth,
  useCart,
} from '../context/usecontext';

export const CheckOut = () => {
  const { cart, addDeliveryDetails, clearCart } = useCart();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [checked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
  });

  const generateOrderId = () => {
    const orderId = uuidv7().replace(/-/g, "").slice(0, 13);
    return orderId;
  };
  const id = generateOrderId();
  const time = new Date();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  const handleSubmit = (product) => {
    //console.log(deliveryDetails);
    if (
      !deliveryDetails.customerName ||
      !deliveryDetails.customerPhone ||
      !deliveryDetails.deliveryAddress ||
      !checked
    ) {
      toast.error("Please fill all form fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Order placed successfully");
      addDeliveryDetails(deliveryDetails, product, id, time);
      clearCart();
      navigate("/admin");
      setIsLoading(false);
    }, 3000);
  };
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const DeliveryFee = 1500;

  return (
    // 1. Ensure the outermost wrapper has NO 'overflow' classes
    <div className="px-2.5 py-4 sm:px-10 lg:px-10 sm:py-6">
      <div className="flex flex-col gap-0.5 font-medium my-3">
        <h1 className="text-3xl md:text-5xl text-white/90 px-1.5">Checkout</h1>
        <p className="px-2 text-sm sm:text-lg">Complete your order</p>
      </div>

      {/* 2. 'items-start' is REQUIRED here. Without it, the right column stretches to the bottom */}
      <div className="flex flex-col lg:flex-row w-full gap-5 items-start">
        {/* LEFT COLUMN: Delivery & Payment (This scrolls naturally) */}
        <div className="w-full lg:w-2/3">
          <div className="space-y-6">
            <Form>
              <FormHeader className="mb-5">Delivery Information</FormHeader>
              <FormInput
                labelName="customerName"
                inputName="customerName"
                inputType="text"
                inputValue={deliveryDetails.customerName}
                onChange={handleChange}
              >
                Full Name
              </FormInput>
              <FormInput
                labelName="customerPhone"
                inputName="customerPhone"
                inputType="tel"
                inputValue={deliveryDetails.customerPhone}
                onChange={handleChange}
              >
                Phone Number
              </FormInput>
              <MessageArea
                Label="Delivery Address"
                inputName="deliveryAddress"
                message="Enter address"
                height="h-20"
                inputValue={deliveryDetails.deliveryAddress}
                onChange={handleChange}
              />
            </Form>
          </div>

          <div className="flex flex-col gap-3 my-4 p-7 border border-orange-400/30 rounded-xl bg-gray-400/10">
            <p className="text-2xl font-bold text-white/85">Payment Method</p>
            {/* ... Paystack UI ... */}
            <div className="flex items-center gap-3 my-4 p-4 border border-orange-400/30 rounded-xl bg-gray-400/10 text-xl font-semibold">
              <div className="flex items-center gap-2">
                <div
                  onClick={handleClick}
                  className={`rounded-full  ${checked ? "bg-blue-500 border-2 border-white-90" : "border border-white/40"}  w-3 h-3`}
                ></div>
                <CreditCard />
              </div>
              <div>
                <h5 className="text-white/90 font-semibold">Paystack</h5>
                <p className="text-sm">Pay with card, bank transfer, or USSD</p>
              </div>
            </div>
            {/* for flutter */}
            {/* <div className="flex gap-3 my-4 p-4 border border-orange-400/30 rounded-xl bg-gray-400/10 text-xl font-semibold">
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full border border-white/40 w-3 h-3`}
                ></div>
                <CreditCard />
              </div>
              <div>
                <h5 className="text-white/90 font-semibold">Paystack</h5>
                <p className="text-sm">Pay with card, bank transfer, or USSD</p>
              </div>
            </div> */}
            <div className="flex items-center gap-3 my-4 p-4 border border-orange-400/30 rounded-xl bg-gray-400/10 text-xl font-semibold">
              <Lock />
              <p className="text-sm">
                Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary (The Sticky One) */}
        {/* Notice: REMOVED 'overflow-auto' and 'max-h-fit' from here */}
        <div className="sticky top-10 lg:w-1/3 w-full p-7 border border-orange-400/30 rounded-xl bg-gray-400/10 text-white/85">
          <p className="text-2xl font-bold mb-4">Order Summary</p>

          <div className="flex flex-col gap-2.5 ">
            <div className="max-h-[40vh] overflow-y-auto scrollbar-hide">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-3 text-white text-sm sm:text-lg "
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-white/70 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div>₦{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-y border-orange-400/20 py-4 mt-2 text-sm sm:text-lg">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <span>₦{subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <span>₦{DeliveryFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-orange-400 font-bold pt-2">
              <p className="text-xl">Total</p>
              <span className="text-2xl">
                ₦{(subTotal + DeliveryFee).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <CsButton
              text={`${isLoading ? "Confirming" : "Confirm Order"}`}
              action={() => handleSubmit(cart)}
              className={`bg-orange-400/90 w-full p-4 rounded-xl text-lg text-black/80 hover:bg-orange-400/70 font-semibold`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// <div className="px-2.5 py-4 sm:px-10 lg:px-10 sm:py-6">
//   <div className="flex flex-col gap-0.5 font-medium my-3">
//     <h1 className="text-3xl md:text-5xl text-white/90 px-1.5">Checkout</h1>
//     <p className="px-2 text-sm sm:text-lg">Complete your order</p>
//   </div>

//   <div className="flex flex-wrap md:flex-nowrap  w-full gap-5 items-start">
//     <div className="w-full md:w-2/3 ">
//       {/* form for delivery */}
//       <div className="space-y-6">
//         <Form
//         //action={}
//         >
//           <FormHeader className={`mb-5`}>Delivery Information</FormHeader>
//           <FormInput
//             // onChange={}
//             labelName={"customerName"}
//             inputName={"customerName"}
//             inputType={"text"}
//             // inputValue={}
//           >
//             Full Name
//           </FormInput>
//           <FormInput
//             // onChange={}
//             labelName={"customerPhone"}
//             inputName={"customerPhone"}
//             inputType={"tel"}
//             // inputValue={}
//           >
//             Phone Number
//           </FormInput>
//           <MessageArea
//             Label={"Delivery Address"}
//             inputName={"deliveryAddress"}
//             message={"Enter your complete delivery address"}
//             height={"h-20"}
//             //inputValue={}
//             // onChange={}
//           ></MessageArea>
//         </Form>
//       </div>
//       {/* Payment Method */}
//       <div className="flex flex-col gap-3 my-4 p-7 border border-orange-400/30 rounded-xl bg-gray-400/10 text-2xl font-bold text-white/85">
//         <p>Payment Method</p>
//         <div className="flex items-center gap-3 my-4 p-4 border border-orange-400/30 rounded-xl bg-gray-400/10 text-xl font-semibold">
//           <div className="flex items-center gap-2">
//             <div
//               className={`rounded-full border border-white/40 w-3 h-3`}
//             ></div>
//             <CreditCard />
//           </div>
//           <div>
//             <h5 className="text-white/90 font-semibold">Paystack</h5>
//             <p className="text-sm">Pay with card, bank transfer, or USSD</p>
//           </div>
//         </div>
//         {/* for flutter */}
//         {/* <div className="flex gap-3 my-4 p-4 border border-orange-400/30 rounded-xl bg-gray-400/10 text-xl font-semibold">
//           <div className="flex items-center gap-2">
//             <div
//               className={`rounded-full border border-white/40 w-3 h-3`}
//             ></div>
//             <CreditCard />
//           </div>
//           <div>
//             <h5 className="text-white/90 font-semibold">Paystack</h5>
//             <p className="text-sm">Pay with card, bank transfer, or USSD</p>
//           </div>
//         </div> */}
//         <div className="flex items-center gap-3 my-4 p-4 border border-orange-400/30 rounded-xl bg-gray-400/10 text-xl font-semibold">
//           <Lock />
//           <p className="text-sm">
//             Your payment information is encrypted and secure. We never store
//             your card details.
//           </p>
//         </div>
//       </div>
//       <div>
//         <CsButton />
//       </div>
//     </div>
//     {/* order summary */}
//     <div className="sticky top-6 md:w-1/3 flex flex-col gap-3 w-full max-h-fit  my-4 p-7 border border-orange-400/30 rounded-xl bg-gray-400/10 text-2xl font-bold text-white/85">
//       <p>Order Summary</p>
//       <div className="flex flex-col gap-2.5">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex justify-between items-center gap-3 text-white text-sm sm:text-lg"
//           >
//             <div>
//               <p>{item.name}</p>
//               <p className="text-white/70 text-sm">Qty: {item.quantity}</p>
//             </div>
//             <div>₦{(item.price * item.quantity).toLocaleString()}</div>
//           </div>
//         ))}
//         <div className="flex flex-col gap-4 border-y border-orange-400/20 py-2 text-sm sm:text-lg w-full">
//           <div className="flex justify-between items-center">
//             <p>Subtotal</p>
//             <span>₦{subTotal.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <p>Delivery Fee</p>
//             <span>₦{DeliveryFee.toLocaleString()} </span>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <p>Total</p>
//           <span>₦{(subTotal + DeliveryFee).toLocaleString()}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
