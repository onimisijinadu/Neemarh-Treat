import {
  ArrowRight,
  Clock,
  Ribbon,
  Sparkles,
  Star,
  StarIcon,
  TrendingUp,
  Zap,
} from "lucide-react";
import { easeInOut, motion } from "motion/react";
import { useNavigate } from "react-router";

import jollofrice from "../assets/jollofrice.jpg";
import hero from "../assets/restaurants.jpg";
import { CsButton } from "../component/button";
import { useCart } from "../context/usecontext";
import { Reviews } from "../data/reviews";

export const Home = () => {
  const navigate = useNavigate();

  const { meals } = useCart();

  const startIndex = 0;

  const endIndex = 5;

  const displayfood = meals.slice(startIndex, endIndex);

  const handleClick = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div>
      {/* <div className="px-3 py-4 sm:px-10 lg:px-10 sm:py-6 "> */}
      {/* hero section */}
      <section className="relative  w-full overflow-hidden bg-mist-950 px-4.5 py-9 sm:px-10 lg:px-10 sm:py-9">
        {/* background image */}
        <img
          src={hero}
          alt="hero background"
          className="absolute inset-0 object-cover w-full h-full opacity-20"
        />

        {/* blur gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/50 z-10"></div>
        {/* <div className='absolute inset-0 backdrop-blur-lg [mask-image:linear-gradient(to_bottom,black_20%,transparent_70%)] z-10'></div> */}

        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-100"></div> */}
        <div className="relative z-20  flex gap-20 items-center justify-between max-w-screen">
          {/* Hero WriteUp Contents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileInView={{ scale: 1.05, x: -2 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 bg-orange-500/20 text-sm sm:text-lg text-orange-400/90  font-semibold border border-orange-400/90 rounded-full w-max p-2">
              {/* logo and text*/}
              <Sparkles className="w-4 h-4 text-orange-400/90" />
              <p> Premium Fine Dining Experience</p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl sm:text-4xl lg:5xl font-bold text-white/80 text-wrap mt-4 sm:mt-6 ">
                <span className="text-orange-300">Neemah's Treat</span> <br />
                Where Tradition <br />
                <span className="text-orange-400/90"> Meets Excellence</span>
              </h1>
              <p className="text-white/60 font-semibold text-sm sm:text-lg lg:text-xl">
                Immerse yourself in an extraordinary culinary journey. Authentic
                flavors, premium ingredients, exceptional service.
              </p>
              <div className="flex gap-3 mt-3 lg:w-full">
                <CsButton
                  text="Explore Menu"
                  Icon={ArrowRight}
                  action={() => navigate("/menu")}
                  className={`flex lg:w-full flex-row-reverse items-center justify-center gap-2 font-semibold hover:shadow hover:shadow-orange-400 bg-orange-400/80 rounded-xl py-2.5 px-4`}
                />
                <CsButton
                  text="Our Story"
                  action={() => navigate("/about")}
                  className={`flex lg:w-full justify-center items-center font-semibold bg-black/60 text-orange-300 hover:shadow hover:shadow-orange-400/30 hover:bg-ornage-400/20 border border-orange-400/60 rounded-xl py-2.5 px-4`}
                />
              </div>
              {/* experience */}
              <div className="flex items-center flex-wrap gap-3 flex-1 mt-3 py-3 border-t border-orange-400/50">
                <div className="flex items-center gap-2.5 font-semibold ">
                  <div className="p-2 bg-orange-400/20 rounded-lg">
                    <Ribbon className="w-5 h-5 text-orange-400/90" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg sm:text-xl font-bold  text-orange-400/90">
                      15+
                    </p>
                    <p className="text-xs text-white/60">Years of Excellence</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 font-semibold ">
                  <div className="p-2 bg-orange-400/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-400/90" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg sm:text-xl font-bold  text-orange-400/90">
                      50k+
                    </p>
                    <p className="text-xs text-white/60">Happy Customers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 font-semibold ">
                  <div className="p-2 bg-orange-400/20 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-400/90" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg sm:text-xl font-bold  text-orange-400/90">
                      200+
                    </p>
                    <p className="text-xs text-white/60">Signature Dishes</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Signature food image */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileInView={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.6 }}
            className="relative hidden md:flex w-full md:h-112.5 rounded-xl border-3 border-orange-400/40 mt-2 mb-5 "
          >
            <img
              src={jollofrice}
              alt="Signature Dish"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute z-10 bottom-3 right-6 translate-x-2  w-11/12 flex justify-between items-center p-4 border border-orange-400/70 rounded-xl bg-black/60 text-orange-300 font-semibold">
              <div>
                <p className="text-lg">Signature Jollof</p>
                <p className="text-white/40">Chef's Special</p>
              </div>
              <div className="flex gap-2 bg-black/60 rounded-xl border border-orange-400/70 p-1.5">
                <StarIcon className="text-orange-400 " fill="#fb923c" />
                <p className="text-orange-400">4.8</p>
              </div>
            </div>
          </motion.div>
        </div>
        {/* scroll animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2,
            ease: easeInOut,
            repeat: Infinity,
          }}
          className="relative inset-0 z-10 flex flex-col gap-2 text-orange-400/90 items-center justify-center mt-10"
        >
          <p>SCROLL</p>
          <div className="flex items-center justify-center rounded-full w-4 h-7 border border-orange-400/60">
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 3,
                ease: easeInOut,
                repeat: Infinity,
              }}
              className="rounded-full w-1.5 h-1.5 bg-orange-400"
            ></motion.div>
          </div>
        </motion.div>
      </section>
      {/* featured meals */}
      <section className=" px-4.5 py-10 sm:px-10 lg:px-10 sm:py-9 bg-brandsurface">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 bg-orange-500/20 text-sm sm:text-lg text-orange-400/90  font-semibold border border-orange-400/90 rounded-full w-max p-2 px-3.5"
        >
          {/* logo and text*/}
          <Sparkles className="w-4 h-4 text-orange-400/90" />
          <p> Featured Collection</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 100 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          className="font-semibold text-2xl lg:text-4xl mt-3 flex flex-col gap-4"
        >
          <p className="text-orange-300">
            Culinary <br />
            <span className="text-brandtext">Masterpieces</span>
          </p>
          <p className="text-sm sm:text-lg lg:text-xl sm:w-3/5">
            Each dish tells a story of passion, tradition, and innovation.
            Handcrafted with the finest ingredients.
          </p>
        </motion.div>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
            {displayfood.map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`${
                      index === 0 ? "max-h-150" : "h-70"
                    } relative rounded-xl overflow-hidden border border-orange-400/50 group`}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-110 w-full h-full"
                    />

                    {/* dark overlay */}
                    <div className="absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black-20 to-black/5"></div>

                    {/* featured badge */}
                    <div className="absolute top-6 right-6">
                      <div className="px-4 py-2  bg-orange-400 text-brandsurface rounded-full text-xs font-bold tracking-wide shadow-lg shadow-orange-500/50">
                        SIGNATURE
                      </div>
                    </div>
                    <div className="absolute z-10 opacity-90 inset-x-0 -bottom-6 p-8">
                      {/* Rating and readyTime */}
                      <div className="flex items-center gap-2">
                        {/* rating */}
                        <div className="flex items-center gap-1 bg-black/70 font-semibold rounded-full py-2 px-3">
                          <Star
                            fill="#ff8800"
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-orange-400/90 font-semibold ml-1 text-sm sm:text-lg">
                            {food.rating}
                          </span>
                        </div>
                        {/* readyTime */}
                        <div className="flex items-center gap-1 bg-black/70 font-semibold rounded-full py-2 px-3.5">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-white/70 ml-1 text-sm sm:text-lg">
                            {food.readyTime}
                          </span>
                        </div>
                      </div>
                      {/* food name and description */}
                      <div className="flex flex-col gap-1">
                        <p className="text-orange-300  font-bold text-lg sm:text-xl lg:text-2xl">
                          {food.name}
                        </p>
                        <p className="text-white/70 text-sm sm:text-lg font-semibold ">
                          {food.description}
                        </p>
                      </div>
                      {/* price and order button */}
                      <div className="flex items-center justify-between mt-4 group">
                        <p className="text-2xl font-bold text-orange-400">
                          ₦{food.price}
                        </p>
                        <CsButton
                          text="Order Now"
                          action={() => handleClick(food.id)}
                          className="flex sm:hidden  group-hover:flex bg-orange-400/90 hover:bg-orange-400/70 text-brandsurface font-bold py-2 px-4 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <CsButton
            text={"Explore Full Menu"}
            Icon={ArrowRight}
            action={() => navigate("/menu")}
            className={`flex flex-row-reverse items-center justify-center gap-1 py-4 px-7 mt-2  text-orange-300 font-semibold border border-orange-400/60 rounded-xl hover:bg-orange-400/20 bg-gray-600/10`}
          />
        </div>
      </section>
      {/* testimonial */}
      <section className="flex flex-col items-center justify-center gap-3 px-4.5 py-10 sm:px-10 lg:px-10 sm:py-9 bg-brandsurface">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 100 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          className="flex items-center gap-2 bg-orange-500/20 text-sm sm:text-lg text-orange-400/90  font-semibold border border-orange-400/90 rounded-full w-max p-2"
        >
          {/* logo and text*/}
          <Star fill="#ff8800" className="w-4 h-4 text-orange-400/90" />
          <p> Client Tetimonials</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 100 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
        >
          <h2 className=" flex flex-col items-center justify-center font-semibold text-2xl sm:text-3xl lg:text-5xl ">
            Loved by <br />
            <span className="text-orange-300">Food Enthusiasts</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start my-14">
          {Reviews.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              // viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              key={item.id}
              className="flex flex-col items-start gap-3 py-7 px-10 bg-gray-400/10 rounded-xl border border-orange-400/60 "
            >
              <div className="flex gap-1.5 items-center mb-2">
                <Star fill="#ff8800" className="w-4 h-4 text-orange-400/90" />
                <Star fill="#ff8800" className="w-4 h-4 text-orange-400/90" />
                <Star fill="#ff8800" className="w-4 h-4 text-orange-400/90" />
                <Star fill="#ff8800" className="w-4 h-4 text-orange-400/90" />
                <Star fill="#ff8800" className="w-4 h-4 text-orange-400/90" />
              </div>
              <div className="font-semibold">{item.feedBack}</div>
              <div className=" flex gap-2.5 w-full items-center my-3 pt-3 border-t border-orange-400/90">
                <div className="w-13 h-13 rounded-full border-2 border-orange-400/60">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover rounded-full w-13 h-12 max-h-13"
                  />
                </div>
                <div className="flex flex-col gap-0">
                  <p className="text-sm sm:text-xl font-semibold text-orange-400/70">
                    {item.name}
                  </p>
                  <p className="text-xs sm:text-sm"> {item.status} </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative flex flex-col items-center justify-center gap-3 px-4.5 py-10 sm:px-10 lg:px-10 sm:py-9 mb-15 bg-linear-to-br from-black/70 via-black/90 to-black/70 opacity-80">
        {/* Background effects */}
        <div className="absolute inset-0 bg-linear-to-l from-orange-900/90 via-orange-500/20 to-orange-900/90" />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-dark-bg to-orange-600/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]" /> */}

        <div className="relative z-20 flex flex-col gap-2.5 items-center justify-center max-w-11/12">
          <div className=" flex items-center gap-2 bg-orange-400/10 text-sm sm:text-lg text-orange-400/90  font-semibold border border-orange-400/90 rounded-full w-max py-1 px-3.5">
            {/* logo and text*/}
            <Sparkles fill="#ff8800" className="w-4 h-4 text-orange-400/90" />
            <p> Start Your Journey</p>
          </div>
          <div className="flex justify-center items-center flex-col gap-2.5 sm:max-w-4/5 ">
            <p className="font-semibold text-xl sm:text-4xl lg:text-6xl text-white">
              Ready to Experience <br />
              <span className="text-orange-400">Culinary Excellence?</span>{" "}
            </p>
            <p className="font-medium text-sm sm:text-lg text-white/90 text-center">
              Join thousands of satisfied customers who trust Neemah's Treat for
              unforgettable dining experience
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 gap-y-3.5 mt-5 mb-13 items-center justify-center max-w-4/5">
            <CsButton
              text={"Start Ordering"}
              Icon={ArrowRight}
              action={() => navigate("/menu")}
              className={`flex flex-row-reverse items-center justify-center bg-orange-400/85 py-2 px-4 text-black/90 font-medium text-sm sm:text-lg  rounded-xl gap-2 cursor-pointer hover:bg-orange-400 transition-colors duration-300`}
            />
            <CsButton
              text={"Contact Us"}
              action={() => navigate("/contact")}
              className={`flex justify-center items-center font-semibold bg-black/60 text-orange-300 hover:text-white hover:shadow hover:shadow-orange-400/10 hover:bg-orange-400/20 border border-orange-400/60 rounded-xl py-2.5 px-4 transition-colors duration-300`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
