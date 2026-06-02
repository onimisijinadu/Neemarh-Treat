import { useState } from 'react';

import {
  Clock,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
// import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { CsButton } from '../component/button';
import { useCart } from '../context/usecontext';

export const Menu = () => {
  const { meals } = useCart();
  const navigate = useNavigate();
  // map() gets all categories, Set() removes duplicates, Array.from() or spread makes it an array again
  // FoodGallery.map(item => item.category): Creates a list like ["Rice", "Rice", "Drinks", "Swallow"].
  //new Set(...): Turns that list into { "Rice", "Drinks", "Swallow" } (removing the extra "Rice").
  const categories = [...new Set(meals.map((item) => item.category))];

  const [selectedMeal, setSelectedMeal] = useState("All");

  const { addToCart } = useCart();

  const filteredFood =
    selectedMeal === "All"
      ? meals
      : meals.filter((food) => food.category == selectedMeal);

  const handleClick = (item) => {
    setSelectedMeal(item);
  };

  const handleAddToCart = (meal, quantity) => {
    addToCart(meal, quantity);
    toast.success(`${meal.name} Successfully Added`);
  };
  return (
    <div className="px-4.5 py-10 sm:px-10 lg:px-10 sm:py-9">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center text-sm w-fit gap-2 py-2 px-4 font-medium bg-orange-400/10 border border-orange-400/40 rounded-full text-orange-400/85"
      >
        <Sparkles className="w-4 h-4" />
        <p>Complete Menu</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2.5 my-4 text-lg font-medium"
      >
        <p className="text-5xl lg:text-7xl text-orange-400/90">
          Our <br /> <span className="text-white/85">Exquisite Menu</span>
        </p>
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-3">
          <div>
            <p className="max-w-2xl md:text-xl">
              Discover our carefully curated collection of authentic dishes,
              each crafted with passion and premium ingredients
            </p>
          </div>
          <div className="flex gap-3 justify-between text-center">
            {/* total dishes */}
            <div>
              <p className="text-xl sm:text-4xl font-semibold text-orange-400/90">
                {meals.length}+
              </p>
              <p className="text-white/50 text-sm">Dishes</p>
            </div>
            {/* total categories */}
            <div>
              <p className="text-xl sm:text-4xl font-semibold text-orange-400/90">
                {categories.length}
              </p>
              <p className="text-white/50 text-sm">Categories</p>
            </div>
          </div>
        </div>
      </motion.div>
      {/* meal selection button*/}
      <div className="flex flex-wrap whitespace-nowrap gap-3 mt-9 mb-5">
        <CsButton
          text={`All`}
          action={() => handleClick(`All`)}
          className={`py-2 px-4.5 ${selectedMeal === "All" ? "bg-amber-500/90 shadow-orange-400" : "bg-gray-400/10 hover:bg-orange-400/10 hover:text-orange-400/50 border border-orange-400/75"} rounded-xl`}
        />
        {categories.map((food, index) => (
          <div key={index}>
            <CsButton
              text={food}
              action={() => handleClick(food)}
              className={`py-2 px-4.5 ${selectedMeal === food ? "bg-amber-500/90 shadow-lg shadow-orange-400/70 text-black/90" : "bg-gray-400/10 hover:bg-orange-400/10 hover:text-orange-400/50 border border-orange-400/75"} rounded-xl`}
            />
          </div>
        ))}
      </div>
      {/* Foods */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3 space-y-4">
        {filteredFood.map((meal, index) => {
          // We vary the heights here
          const isLarge = index % 5 === 0;

          return (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              key={meal.id}
              className={`bg-cardColor border border-orange-400/50 rounded-xl mb-4 flex flex-col ${isLarge ? "row-span-2 sm:h-150" : "row-span-1 h-82.5"}`}
            >
              <div
                onClick={() => navigate(`/menu/${meal.id}`)}
                className={`relative overflow-hidden w-full h-1/2 ${isLarge ? "h-3/5" : "h-3/5"} cursor-pointer group `}
              >
                <img
                  src={meal.image}
                  className="object-cover w-full h-full rounded-t-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                {/* black overlay */}
                <div className="absolute inset-0 from-black/90 via-black/5 to-black/30 bg-linear-to-t z-10"></div>
                {/* overlay contents */}
                <div className="flex items-center gap-1 font-semibold bg-black/85 text-orange-400 border border-orange-400/50 rounded-full py-1 px-3 absolute left-3 top-3 z-15">
                  <Star className="w-4 h-4" fill="orange" />
                  <p>{meal.rating}</p>
                </div>
                {meal.popularity === true && (
                  <div className="flex items-center gap-1 font-bold bg-orange-400 text-black/90 border border-orange-400/50 rounded-full py-1 px-3 absolute right-3 top-3 z-15">
                    <TrendingUp className="w-4 h-4" />
                    <p>Popular</p>
                  </div>
                )}

                <div className="flex items-center gap-1 font-semibold bg-black/85 text-white/75 text-sm border border-orange-400/50 rounded-full py-1 px-3 absolute bottom-3 left-3 z-20">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <p>{meal.readyTime}</p>
                </div>
                <div className="flex items-center gap-1 font-semibold bg-orange-400/10 text-orange-300 text-sm border border-orange-400/50 rounded-full py-1 px-3 absolute bottom-3 right-3 z-20">
                  <p>{meal.category}</p>
                </div>
              </div>
              {/* Content goes here */}
              <div
                className={`px-5 pb-5  flex flex-col gap-5 ${isLarge ? "pt-5" : ""}`}
              >
                <div
                  onClick={() => navigate(`/menu/${meal.id}`)}
                  className="group hover:cursor-pointer"
                >
                  <p
                    className={`${isLarge ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"} text-orange-400/80 font-semibold`}
                  >
                    {meal.name}
                  </p>
                  <p className="text-sm ms:text-lg text-white/50">
                    {meal.description}
                  </p>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <p className="text-sm text-white/50"> Price </p>
                    <p className="text-orange-400/90  text-2xl md:text-3xl font-semibold">
                      ₦{meal.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <CsButton
                      text={`Add`}
                      Icon={Plus}
                      action={() => handleAddToCart(meal, 1)}
                      className={`flex items-center gap-2 text-black/90 font-semibold bg-orange-400/85 hover:bg-orange-300 py-2 px-4 rounded-xl`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
