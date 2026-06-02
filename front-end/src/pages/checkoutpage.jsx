import { useState } from 'react';

import {
  CreditCard,
  LoaderIcon,
  Lock,
} from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import { useNavigate } from 'react-router';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import { v7 as uuidv7 } from 'uuid';

import {
  FormHeader,
  FormInput,
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
    customerName: user.name || "",
    customerPhone: "",
    customerEmail: user.email || "",
    deliveryAddress: "",
  });

  const [orderId, setOrderId] = useState(() => {
    const id = `ORD-${uuidv7().replace(/-/g, "").slice(0, 10).toUpperCase()}`;
    return id;
  });

  // const generateOrderId = () => {
  //   const orderId = uuidv7().replace(/-/g, "").slice(0, 13);
  //   return orderId;
  // };
  const id = orderId;
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

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const DeliveryFee = 1500;

  const finalTotal = subTotal + DeliveryFee;

  // const config = useMemo(() => {
  //   return {
  //     reference: orderId,
  //     email: deliveryDetails.customerEmail || "guest@neamahs.com",
  //     amount: finalTotal * 100, // Converts Naira to Kobo accurately
  //     publicKey: "pk_test_84695b660b5e0acfe6f40ef7f3d9912b7e0fc45b",
  //     metadata: {
  //       custom_fields: [
  //         {
  //           display_name: "Customer Name",
  //           variable_name: "customer_name",
  //           value: deliveryDetails.customerName,
  //         },
  //         {
  //           display_name: "Phone Number",
  //           variable_name: "customer_phone",
  //           value: deliveryDetails.customerPhone,
  //         },
  //         {
  //           display_name: "Delivery Address",
  //           variable_name: "delivery_address",
  //           value: deliveryDetails.deliveryAddress,
  //         },
  //       ],
  //     },

  // }, [orderId, finalTotal]);

  // const config = {
  //   reference: `ORD-${uuidv7().replace(/-/g, "").slice(0, 10).toUpperCase()}`,
  //   email: deliveryDetails.customerEmail || "",
  //   phone: deliveryDetails.customerPhone || "",
  //   amount: finalTotal * 100,
  //   publicKey: "pk_test_84695b660b5e0acfe6f40ef7f3d9912b7e0fc45b",
  //   metadata: {
  //     custom_fields: [
  //       {
  //         display_name: "Customer Name",
  //         variable_name: "customer_name",
  //         value: deliveryDetails.customerName,
  //       },
  //       {
  //         display_name: "Phone Number",
  //         variable_name: "customer_phone",
  //         value: deliveryDetails.customerPhone,
  //       },
  //       {
  //         display_name: "Delivery Address",
  //         variable_name: "delivery_address",
  //         value: deliveryDetails.deliveryAddress,
  //       },
  //     ],
  //   },
  //   onSuccess: (reference) => {
  //     console.log("SUCCESS CALLBACK FIRED");
  //     console.log(reference);
  //     try {
  //       toast.success("Payment successful");
  //       addDeliveryDetails(deliveryDetails, cart, reference.reference, time);
  //       clearCart();
  //       navigate("/menu");
  //     } catch (err) {
  //       toast.error("error generating receipt.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },

  //   onClose: () => {
  //     setIsLoading(false);
  //     toast.error("Payment cancelled");
  //   },
  // };

  const config = {
    reference: orderId,
    email: deliveryDetails.customerEmail || "guest@neamahs.com",
    amount: finalTotal * 100,
    publicKey: "pk_test_84695b660b5e0acfe6f40ef7f3d9912b7e0fc45b",

    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: deliveryDetails.customerName,
        },
        {
          display_name: "Phone Number",
          variable_name: "customer_phone",
          value: deliveryDetails.customerPhone,
        },
        {
          display_name: "Delivery Address",
          variable_name: "delivery_address",
          value: deliveryDetails.deliveryAddress,
        },
      ],
    },

    onSuccess: (reference) => {
      console.log("SUCCESS", reference);

      toast.success("Payment successful");

      addDeliveryDetails(deliveryDetails, cart, reference.reference, time);

      clearCart();

      setIsLoading(false);

      navigate("/menu");
    },

    onClose: () => {
      setIsLoading(false);
      toast.error("Payment cancelled");
    },
  };

  // console.log(initializePayment);
  const isValid =
    deliveryDetails.customerName != "" &&
    deliveryDetails.deliveryAddress != "" &&
    deliveryDetails.customerPhone.length === 11 &&
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      deliveryDetails.customerEmail,
    ) &&
    checked;

  const emptyCart = cart.length === 0;
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
            <div className="flex flex-col gap-3 my-4 p-7 border border-orange-400/60 rounded-xl bg-gray-400/10 text-2xl font-bold">
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
              <FormInput
                labelName="customerEmail"
                inputName="customerEmail"
                inputType="email"
                inputValue={deliveryDetails.customerEmail}
                onChange={handleChange}
              >
                Email
              </FormInput>
              <FormInput
                labelName="deliveryAddress"
                inputName="deliveryAddress"
                inputType="text"
                inputValue={deliveryDetails.deliveryAddress}
                onChange={handleChange}
              >
                Address
              </FormInput>
              {/* <MessageArea
                Label="Delivery Address"
                inputName="deliveryAddress"
                message="Enter address"
                height="h-20"
                inputValue={deliveryDetails.deliveryAddress}
                onChange={handleChange}
              /> */}
            </div>
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
              <span className="text-2xl">₦{finalTotal.toLocaleString()}</span>
            </div>
          </div>
          <div onClick={() => setIsLoading(true)} className="mt-4">
            {isValid && (
              <PaystackButton
                disabled={!isValid || isLoading || emptyCart}
                className={`${isLoading ? " opcaity-50 cursor-not-allowed" : ""} flex items-center justify-center bg-orange-400/90 w-full p-4  rounded-xl text-lg text-black/80 hover:bg-orange-400/70 font-semibold`}
                {...config}
                onSuccess={config.onSuccess}
                onClose={config.onClose}
              >
                {isLoading ? (
                  <LoaderIcon className="w-6 h-6 animate-spin duration-400" />
                ) : (
                  "Confirm Order"
                )}
              </PaystackButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
