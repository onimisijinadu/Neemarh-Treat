import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Check,
  Clock,
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

import { CsButton } from "../component/button";
import { useCart } from "../context/usecontext";

export const Orderdetails = () => {
  const navigate = useNavigate();

  const { addToCart, meals } = useCart();

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const [btnState, setBtnState] = useState(false);

  const meal = meals.find((food) => food.id === parseInt(id));

  const recommend = meals
    .filter((food) => food.category === meal?.category && food.id !== meal?.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(meal, quantity);
    toast.success(`${meal.name} added to cart`);
  };

  const handleDecrement = () => {
    if (quantity >= 1) {
      setQuantity((prev) => prev - 1);
      setBtnState(false);
    } else {
      setBtnState(true);
      setTimeout(() => setBtnState(false), 1000);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    setBtnState(false);
  };
  const handleBuy = () => {
    addToCart(meal, quantity);
    navigate("/cart");
  };

  // scroll up when the id changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 100 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      className="px-4.5 py-10 sm:px-10 lg:px-10 sm:py-9"
    >
      <CsButton
        text={"Back to Menu"}
        Icon={ArrowLeft}
        action={() => navigate("/menu")}
        className={`flex items-center justify-center gap-3 bg-gray-900 hover:bg-orange-400/10 border border-orange-400/90 text-orange-400 font-semibold py-2 px-4 rounded-xl`}
      />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 my-10 sm:my-20">
        {/* meal image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 100 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          className="relative md:mt-13"
        >
          <div className="relative w-full h-75 sm:h-117.5 overflow-hidden rounded-2xl border border-orange-400/20 shadow-lg shadow-orange-400/40">
            <img
              src={meal.image}
              alt={meal.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-3 right-3 w-fit  flex gap-2 items-center text-center py-2 px-4 rounded-full bg-orange-400 text-lg sm:text-xl text-black/90 font-semibold border border-orange-400/30">
              <Sparkles className="text-black/90 w-5 h-5" />
              <p className="text-sm">SIGNATURE DISH</p>
            </div>
            <div className=" absolute bottom-4 left-4  flex gap-1.5 items-center bg-gray-900/90 border border-orange-400/30 w-fit py-2 px-3 rounded-lg backdrop-blur-sm">
              <Star fill="#ff8800" className="w-4 h-4 text-orange-400" />
              <p className="font-semibold text-orange-400 text-lg ">
                {meal.rating}{" "}
                <span className="text-sm text-white/70">/ 5.0</span>
              </p>
            </div>
          </div>
        </motion.div>
        {/* meal details */}
        <div className="flex flex-col items-start gap-4">
          {/* meal category */}
          <div className="w-fit text-center py-2 px-4 rounded-full bg-orange-400/20 text-lg sm:text-xl text-orange-400/90 font-semibold border border-orange-400/30">
            <p>{meal.category}</p>
          </div>
          {/* meal name and rating */}
          <div>
            <p className="text-2xl sm:text-6xl text-orange-500 opacity-90 font-semibold">
              {meal.name}
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 100 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              className="flex items-center gap-3 my-3"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <Star
                      key={index}
                      size={18}
                      fill={
                        ratingValue <= Math.floor(parseFloat(meal.rating))
                          ? "#ff8800"
                          : "transparent"
                      }
                      className={`${ratingValue <= Math.floor(parseFloat(meal.rating)) ? "text-orange-400" : "text-gray-400"}`}
                    />
                  );
                })}
                <span>{meal.rating}</span>
              </div>
              <div className="flex gap-2 items-center bg-gray-900/90 justify-center py-2 px-3.5 border border-ornage-400 rounded-lg w-fit font-medium">
                <Clock className="w-4 h-4 text-orange-400" />
                <p className="text-white/70">{meal.readyTime}</p>
              </div>
            </motion.div>
          </div>
          {/* meal description */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ duration: 0.6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
          >
            <p className="text-brandprimary font-semibold text-lg sm:text-xl">
              Description
            </p>
            <p className="font-medium text-sm sm:text-lg">{meal.description}</p>
          </motion.div>
          {/* whats is included */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ duration: 0.6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <h4 className="text-orange-400/90 font-semibold text-lg sm:text-xl">
              What's Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              {[
                "Premium Ingredients",
                "Chef Prepared",
                "Fresh Daily",
                "Authentic Recipe",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 py-2 px-4 bg-gray-900/80 border border-orange-400/90 rounded-xl text-white font-medium whitespace-nowrap"
                >
                  <div className="flex items-center w-7 h-7 rounded-full p-1 bg-orange-400/20">
                    <Check className="w-9 h-9 text-orange-400 font-bold" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          {/* Price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ duration: 0.6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col gap-2 items-start py-3.5 border-t border-b border-orange-400/70 w-full"
          >
            <p>Price</p>
            <p className="font-semibold text-orange-400/80 text-3xl sm:text-6xl ">
              ₦{meal.price}
            </p>
          </motion.div>
          {/* buttons */}
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-orange-400/80 text-lg">
                Quantity
              </p>

              <div className="flex justify-between items-center gap-2 ">
                <CsButton
                  Icon={Minus}
                  state={btnState}
                  action={handleDecrement}
                  className={`text-orange-400/75 font-semibold border border-orange-400/75 rounded-lg p-2 bg-gray-900/70 hover:bg-orange-400/50`}
                />
                <p>{quantity}</p>
                <CsButton
                  Icon={Plus}
                  action={handleIncrease}
                  className={`text-orange-400/75 font-semibold border border-orange-400/75 rounded-lg p-2 bg-gray-900/70 hover:bg-orange-400/50`}
                />
              </div>
            </div>
            <div className="flex  items-center gap-3 w-full">
              <CsButton
                text={"Add to Cart"}
                Icon={ShoppingCart}
                action={handleAddToCart}
                className={`flex items-center justify-center w-full gap-3 bg-gray-900/75 hover:bg-orange-400/10 border border-orange-400/90 text-orange-400 font-semibold py-2 px-4 rounded-xl`}
              />
              <CsButton
                text={"Buy Now"}
                action={handleBuy}
                className={`flex items-center justify-center w-full bg-orange-400/75 border border-orange-400/90 text-black/90 font-semibold py-2 px-4 rounded-xl`}
              />
            </div>
          </div>
        </div>
      </section>
      {/* features dishes */}
      <section className="flex flex-col items-center justify-center gap-6 my-10 sm:my-16 w-full">
        <div className="w-fit  flex gap-2 items-center text-center py-2 px-4 rounded-full bg-orange-400/20 text-lg sm:text-xl text-orange-400 font-semibold border border-orange-400/30">
          <Sparkles className="text-orange-500 w-5 h-5" />
          <p className="text-sm ">Similar Dishes</p>
        </div>
        <p className="text-lg sm:text-4xl font-semibold">
          You May Also <span className="text-orange-400">Enjoy</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-3 ">
          {recommend.map((item) => (
            <Link
              key={item.id}
              to={`/menu/${item.id}`}
              className="relative bg-cardColor  border border-orange-500/70 rounded-lg w-full h-75 sm:h-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="relative object-cover w-full h-3/4 rounded-t-lg"
              />
              <div className=" absolute top-3 left-3  flex gap-1.5 items-center bg-gray-900/90 border border-orange-400/30 w-fit py-1 px-2 rounded-lg backdrop-blur-sm">
                <Star fill="#ff8800" className="w-3 h-3 text-orange-400" />
                <p className="font-semibold text-orange-400 text-sm">
                  {item.rating}
                </p>
              </div>
              <div className="mx-2.5 my-3 text-orange-400 font-semibold">
                <p className="text-xl sm:text-2xl"> {item.name} </p>
                <p className="text-xl sm:text-4xl">₦{item.price} </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
