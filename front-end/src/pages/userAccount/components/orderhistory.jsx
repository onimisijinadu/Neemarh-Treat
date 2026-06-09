import { useState } from "react";

import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

import { useCart } from "../../../context/usecontext";

export const OrderHistory = () => {
  const { delivery } = useCart();

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 11;

  const startIndex = (currentPage - 1) * itemPerPage;

  const endIndex = startIndex + itemPerPage;

  const orderHistory = delivery.slice(startIndex, endIndex);

  const deliveryFee = 1500;
  const totalOrders = orderHistory.reduce((total, order) => {
    if (order.status.toLowerCase() !== "completed") return total;

    const totalPerItem = order.products?.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    return total + totalPerItem + deliveryFee;
  }, 0);

  //   const formattedTotal = new Intl.NumberFormat("en-us", {
  //     currency: "NGN",
  //     style: "currency",
  //   }).format(totalOrders);

  const formattedTotal = totalOrders.toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maxmumFractionDigits: 2,
  });

  return (
    <div
      className={
        "flex flex-col w-full md:w-175 lg:w-225 gap-3 bg-gray-900 my-6 py-7 px-7 rounded-xl text-2xl font-bold"
      }
    >
      <div className="flex justify-between my-5">
        <h2>Order History</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`${currentPage >= 2 ? "inline-block" : "hidden"} cursor-pointer`}
          >
            <ChevronLeftCircle />{" "}
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`${endIndex <= delivery.length ? "inline-block" : "hidden"} cursor-pointer`}
          >
            <ChevronRightCircle />{" "}
          </button>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 p-2 sm:py-4 sm:px-6 lg:p-6 border border-gray-400/20 font-sans rounded-lg">
          {orderHistory.map((order) => (
            <div
              key={order.orderId}
              className="flex flex-col w-full text-base p-2 border-b border-b-gray-400/20 "
            >
              <div className="flex justify-between gap-2 item-center">
                <div className="flex flex-col text-left leading-0">
                  <div className=" flex text-left whitespace-nowrap text-sm sm:text-base lg:text-lg text-white font-bold">
                    Order <span className="font-bold ml-1"> #</span>
                    {order.orderId}
                  </div>
                  <div className="flex items-center text-white/50 font-medium gap-1">
                    <p className="text-xs">{order.date}</p>
                  </div>
                </div>
                <div
                  className={`flex justify-center items-center text-xs md:text-sm font-medium gap-1 px-2.5 py-0.5 h-fit rounded-full ${order.status === "Pending" ? "bg-orange-400/10 text-amber-400" : order.status === "Completed" ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"}`}
                >
                  <p>{order.status}</p>
                </div>
              </div>
              <div className="mt-3">
                {order.products?.map((meal) => (
                  <div
                    key={meal.name}
                    className="flex justify-between gap-3 text-white/50 font-medium text-xs md:text-sm"
                  >
                    <div className="flex gap-2">
                      <p>{meal.quantity}x </p>
                      <span>{meal.name}</span>
                    </div>
                    <p>₦{(meal.price * meal.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-between gap-3 text-sm md:text-lg font-bold pt-4 mt-3">
            <p className="text-white/90">Total</p>
            <p className="text-orange-500">
              ₦{formattedTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
