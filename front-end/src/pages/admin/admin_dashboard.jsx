import { useState } from 'react';

import {
  Calendar,
  CheckCircle,
  Clock,
  FolderInput,
  MapPin,
  Package,
  Phone,
  Upload,
  User,
  UtensilsCrossed,
  XCircle,
  XIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { CsButton } from '../../component/button';
import {
  Form,
  FormHeader,
  FormInput,
  MessageArea,
} from '../../component/form';
import { Overlay } from '../../component/overly';
import { useCart } from '../../context/usecontext';

export const AdminDashboard = () => {
  const { delivery, setDelivery, meals, addMeal } = useCart();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("All");

  const [isChecked, setIsChecked] = useState(false);

  const [modal, setModal] = useState(false);

  const [fileName, setFileName] = useState("No file chosen");

  const [isLoading, setIsLoading] = useState(false);

  const [mealDetails, setMealDetails] = useState({
    id: "",
    name: "",
    image: "",
    category: "",
    readyTime: "",
    price: "",
    description: "",
    rating: "",
    popularity: isChecked,
  });

  const deliveryFee = 1500;

  const filteredDelivery = delivery.filter((item) => {
    return isActive === "All" ? item : item.status === isActive;
  });

  //to check the total pending, the total completed and the total cancelled orders, we can filter the delivery array based on the status of the order
  const pendingOrders = delivery.filter((order) => order.status === "Pending");
  const completedOrders = delivery.filter(
    (order) => order.status === "Completed",
  );
  const cancelledOrders = delivery.filter(
    (order) => order.status === "Cancelled",
  );

  //to calculate the total revenue, we can filter the delivery array based on the status of the order and then reduce the array to get the total revenue

  // const totalRevenue = delivery
  //   .filter((order) => order.status === "Completed")
  //   .reduce((sum, item) => sum + item.price * item.quantity, 0);

  //Calculating total revenue by iterating through the delivery array and checking the status of each order. If the status is "Completed", we calculate the subTotal for that order by reducing the products array and then add it to the total revenue.
  const totalRevenue = delivery.reduce((total, item) => {
    //any order that is not completed should be filtered out
    if (item.status !== "Completed") return total;

    //check sum the total revenue from each order and save it to subtotal so that i can use it to get the total revenue
    const subTotal = item.products.reduce(
      (sum, meal) => sum + meal.price * meal.quantity,
      0,
    );

    return total + subTotal + deliveryFee;
  }, 0);

  const handleConfirm = (orderId) => {
    setDelivery((prevDelivery) =>
      prevDelivery.map((item) =>
        item.orderId === orderId ? { ...item, status: "Completed" } : item,
      ),
    );
  };
  const handleCancel = (orderId) => {
    setDelivery((prevDelivery) =>
      prevDelivery.map((item) =>
        item.orderId === orderId ? { ...item, status: "Cancelled" } : item,
      ),
    );
  };

  //console.log(totalRevenue);

  const handleClick = (data) => {
    setIsActive(data);
  };

  const handleUpload = () => {
    setModal((prev) => !prev);
  };
  const handleBtnCancel = () => {
    setModal((prev) => !prev);
    setMealDetails({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
      readyTime: "",
      rating: "",
      popularity: false,
    });
  };

  const handleCheckChange = (e) => {
    const checkedValue = e.target.checked;
    setIsChecked(checkedValue);
    setMealDetails((prev) => ({
      ...prev,
      popularity: checkedValue,
    }));
  };

  const handleChange = (e) => {
    setMealDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const generateId = () => {
  //   const idd = Date.now().toLocaleString() + uuidv7();

  //   return idd.slice(0, 15);
  // };

  //file upload function

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      //to get the base64 string of the image or file
      const base64String = reader.result;

      setMealDetails((prev) => ({
        ...prev,
        image: base64String,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (
      !mealDetails.name ||
      !mealDetails.price ||
      !mealDetails.description ||
      !mealDetails.category ||
      !mealDetails.image ||
      !mealDetails.readyTime ||
      !mealDetails.rating
    ) {
      toast.error("Please fill in all the fields including the image");
      return;
    }

    setIsLoading(true);

    const finalMeal = {
      id: Date.now(), // Generate a unique ID for the demo
      name: mealDetails.name,
      image: mealDetails.image,
      category: mealDetails.category,
      readyTime: mealDetails.readyTime,
      price: Number(mealDetails.price), // Ensure price is a number
      description: mealDetails.description,
      rating: Number(mealDetails.rating), // Ensure price is a number
      popularity: isChecked,
    };

    setTimeout(() => {
      // 1. Call the context function
      addMeal(finalMeal);

      // 2. Reset the form
      setModal(false);
      setMealDetails({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
        readyTime: "",
        rating: "",
      });
      setIsLoading(false);
      setFileName("No file chosen");
      toast.success("Meal added to menu!");
    }, 2000);
    console.log(mealDetails);
  };
  // const filteredCart = cart.map((item)=> return(item));
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
      }}
      className=" px-4.5 py-10 sm:px-10 lg:px-10 sm:py-9 bg-brandsurface"
    >
      <div className={`flex flex-col gap-4`}>
        <h2 className={`text-2xl sm:text-4xl font-semibold`}>
          Admin Dashboard
        </h2>
        <div className={`flex gap-3 w-full`}>
          <CsButton
            text={`Upload Meal`}
            Icon={Upload}
            // iconColor={}
            action={handleUpload}
            className={`flex gap-2 items-center justify-center bg-gray-400/10 hover:bg-orange-400/10 hover:text-orange-400/50 border border-orange-400/75 p-4 rounded-xl cursor-pointer font-semibold`}
          />
          <CsButton
            text={`Manage Meals`}
            Icon={UtensilsCrossed}
            // iconColor={}
            action={() => navigate("/admin/manage_meals")}
            className={`flex gap-2 items-center justify-center bg-gray-400/10 hover:bg-orange-400/10 hover:text-orange-400/50 border border-orange-400/75 p-4 rounded-xl cursor-pointer font-semibold`}
          />
        </div>
        <p>Manage orders and track restaurant performance</p>
      </div>
      <section>
        {/* customer order details and records */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full my-5">
          {/* // total order */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-400/10 border border-orange-400/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Total Order</span>
              <span className="text-2xl">
                <Package className="w-5 h-5" />
              </span>
            </div>
            <div className="text-3xl font-bold">{delivery.length} </div>
          </motion.div>
          {/* //   pending */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-400/10 border border-orange-400/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Pending</span>
              <span className="text-2xl">
                <Clock className="w-5 h-5 text-yellow-400/90" />
              </span>
            </div>
            <div className="text-3xl font-bold text-amber-400">
              {pendingOrders.length}
            </div>
          </motion.div>
          {/* //   completed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-400/10 border border-orange-400/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Completed</span>
              <span className="text-2xl">
                <CheckCircle className="w-5 h-5 text-green-400/70" />
              </span>
            </div>
            <div className="text-3xl font-bold text-green-400">
              {completedOrders.length}
            </div>
          </motion.div>
          {/* cancelled */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-400/10 border border-orange-400/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Cancelled</span>
              <span className="text-2xl">
                <XCircle className="w-5 h-5 text-red-400/90" />
              </span>
            </div>
            <div className="text-3xl font-bold text-red-400">
              {cancelledOrders.length}
            </div>
          </motion.div>
          {/* total revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-400/10 border border-orange-400/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className=" text-sm">Total Revenue</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold">
              ₦ {totalRevenue.toLocaleString()}
            </div>
          </motion.div>
        </div>
        {/* select specific order status */}
      </section>
      {/* Filter controls */}
      <section className="flex flex-wrap gap-3 my-4">
        {[
          {
            label: "All",
          },
          {
            label: "Pending",
          },
          {
            label: "Completed",
          },
          {
            label: "Cancelled",
          },
        ].map((item, index) => (
          <div key={index}>
            <CsButton
              text={item.label}
              action={() => handleClick(item.label)}
              className={`flex gap-2 items-center w-full justify-center hover:bg-orange-400/10 hover:text-orange-400/50 border border-orange-400/75 py-2.5 px-5.5 rounded-xl cursor-pointer font-semibold ${isActive === item.label ? "bg-orange-500/90 hover:bg-orange-400/75" : "bg-gray-400/10"}`}
            />
          </div>
        ))}
      </section>
      <section className="min-h-96 text-white">
        <div className="flex flex-col gap-5">
          {filteredDelivery.length === 0 ? (
            <div className="flex justify-center items-center text-center flex-col gap-3 bg-gray-400/10 text-red border border-orange-400/30 rounded-xl p-6 h-60">
              <Package className="w-14 h-14" />
              <p className="text-xl text-white/70">No orders found</p>
            </div>
          ) : (
            filteredDelivery.map((item) => {
              const subTotal =
                item.products?.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                ) || 0;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  key={item.orderId}
                  className="flex flex-col lg:flex-row w-full gap-3 bg-gray-400/10 text-red border border-orange-400/30 rounded-xl p-6 h-fit"
                >
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between gap-3 item-center">
                      <div className="flex flex-col text-left gap-2">
                        <div className=" flex text-xl lg:text-2xl text-white/90 font-semibold">
                          Order <span className="font-light ml-1"> #</span>
                          {item.orderId}
                        </div>
                        <div className="flex items-center text-white/50 font-medium gap-1">
                          <span>
                            <Calendar className="w-4 h-4" />
                          </span>
                          <p className="text-sm">{item.date}</p>
                        </div>
                      </div>
                      <div
                        className={`flex justify-center items-center gap-1 px-2.5 py-0.5 h-fit rounded-full ${item.status === "Pending" ? "bg-orange-400/20 text-orange-400/90" : item.status === "Completed" ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"}`}
                      >
                        <span>
                          {item.status === "Cancelled" ? (
                            <XCircle className="w-5 h-5" />
                          ) : item.status === "Completed" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </span>
                        <p>{item.status}</p>
                      </div>
                    </div>
                    {/* details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 p-5 my-3 bg-gray-400/10 rounded-xl">
                      <div className="flex gap-2.5">
                        <User className="w-6 h-6 mt-2" />
                        <div>
                          <p className="text-sm text-white/50">Customer</p>
                          <p className="font-bold text-lg">
                            {item.customerName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <Phone className="w-6 h-6 mt-2" />
                        <div>
                          <p className="text-sm text-white/50">Phone</p>
                          <p className="font-bold text-lg">
                            {item.customerPhone}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <MapPin className="w-6 h-6 mt-2" />
                        <div>
                          <p className="text-sm text-white/50">
                            Delivery Address
                          </p>
                          <p className="font-bold text-lg italic">
                            {item.deliveryAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>Items</p>
                      <div>
                        {item.products?.map((meal) => (
                          <div>
                            <div className="flex justify-between gap-3">
                              <div className="flex gap-2">
                                <p>{meal.quantity}x </p>
                                <span>{meal.name}</span>
                              </div>
                              <p>
                                ₦{(meal.price * meal.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between gap-3 text-lg font-semibold pt-4 border-t border-t-orange-400/30 mt-3">
                          <p>Total</p>
                          <p>₦{(subTotal + deliveryFee).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${item.status === "Completed" || item.status === "Cancelled" ? "hidden" : "flex flex-col gap-3 my-4 lg:my-0 lg:ml-2 lg:w-3/12 "}`}
                  >
                    <CsButton
                      text={`Complete`}
                      Icon={CheckCircle}
                      iconColor={`w-5 h-5`}
                      action={() => handleConfirm(item.orderId)}
                      className={`${item.status === "Cancelled" || item.status === "Completed" ? "hidden" : "flex gap-2 items-center justify-center text-lg bg-green-400 border border-green-400 hover:bg-green-400/75 p-3 rounded-xl cursor-pointer font-semibold"}`}
                    />
                    <CsButton
                      text={`Cancel`}
                      Icon={XCircle}
                      iconColor={`w-5 h-5`}
                      action={() => handleCancel(item.orderId)}
                      className={`${item.status === "Cancelled" || item.status === "Completed" ? "hidden" : "flex gap-2 items-center justify-center text-lg bg-red-500/75 border border-red-500/75 hover:bg-red-500 p-3 rounded-xl cursor-pointer font-semibold "}`}
                    />
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>
      {modal && (
        <>
          {/* The Overlay  */}
          <Overlay isOpen={modal} togglOverlay={handleUpload} />

          {/* Modal Content goes here */}
          <Form
            action={handleOnSubmit}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-brandsurface w-[90%] sm:w-140 h-130 p-6 overflow-y-auto shadow-2xl border border-orange-400/20 rounded-xl`}
          >
            <FormHeader
              className={`flex justify-between gap-2 my-3.5 mb-4 text-3xl font-semibold`}
            >
              <p>Upload Meal</p>
              <CsButton
                Icon={XIcon}
                iconColor={`w-5 h-5`}
                action={handleUpload}
                className={`flex items-center`}
              />
            </FormHeader>
            <FormInput
              inputType={`text`}
              inputName={`name`}
              inputValue={mealDetails.name}
              labelName={`mealName`}
              onChange={handleChange}
            >
              Meal Name
            </FormInput>
            <div className="flex w-full flex-col sm:flex-row gap-2">
              <FormInput
                inputType={`text`}
                inputName={`category`}
                inputValue={mealDetails.category}
                labelName={`mealCategory`}
                onChange={handleChange}
              >
                Category
              </FormInput>
              <FormInput
                inputType={`text`}
                inputName={`price`}
                inputValue={mealDetails.price}
                labelName={`mealPrice`}
                onChange={handleChange}
              >
                Price(₦)
              </FormInput>
            </div>
            <MessageArea
              Label={`Description`}
              inputName={`description`}
              inputValue={mealDetails.description}
              onChange={handleChange}
              message={`Description here....`}
              height={`h-30`}
            ></MessageArea>
            <div className="my-5">
              <FormInput
                inputType={`File`}
                className={`hidden truncate`}
                labelName={"mealImage"}
                inputName={"image"}
                onChange={handleFileUpload}
                optionalClassName={`relative h-10 truncate  w-3/4 sm:w-1/2 border border-orange-400/20 rounded-xl `}
                labelClassName={`flex absolute z-50 flex gap-2 items-center  font-semibold text-lg left-13 top-2 -translate-x-7 cursor-pointer truncate`}
              >
                <FolderInput className="w-5 h-5" />
                <p className="text-sm whitespace-nowrap max-w-40 truncate">
                  {fileName}
                </p>
              </FormInput>

              <p className="text-sm text-white/50 ml-1">
                Click to upload the Image of the meal
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <FormInput
                inputType={`Number`}
                inputName={`rating`}
                inputValue={mealDetails.rating}
                labelName={`rating`}
                max={5}
                min={1}
                step={0.1}
                onChange={handleChange}
              >
                Rating
              </FormInput>
              <FormInput
                inputName={`readyTime`}
                inputValue={mealDetails.readyTime}
                labelName={`readyTime`}
                onChange={handleChange}
              >
                Prep Time
              </FormInput>
            </div>
            <div className="flex items-center gap-2">
              <FormInput
                inputType={`checkbox`}
                inputName={`popularity`}
                labelName={`popularity`}
                className={`w-3 h-3`}
                optionalClassName={`w-3`}
                checked={isChecked}
                onChange={handleCheckChange}
              ></FormInput>
              <label htmlFor="popularity">Mark as Featured</label>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-3 items-center my-5">
              <CsButton
                text={`Cancel`}
                action={handleBtnCancel}
                className={`flex justify-center items-center p-3 w-full bg-gray-400/20 hover:bg-gray-400/50 rounded-xl text-white/60 font-semibold`}
              />
              <CsButton
                text={`${isLoading ? "Uploading.." : "Upload Meal"}`}
                action={handleOnSubmit}
                Icon={Upload}
                iconColor={`w-4 h-4`}
                className={`flex justify-center items-center gap-2 p-3 w-full bg-green-400/75 hover:bg-green-400/50 font-semibold rounded-xl text-white/90`}
              />
            </div>
          </Form>
        </>
      )}
    </motion.div>
  );
};
