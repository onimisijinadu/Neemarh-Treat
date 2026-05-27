import { useState } from 'react';

import {
  ArrowLeftCircle,
  EditIcon,
  FolderInput,
  Save,
  Star,
  Trash2,
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
import { Modal } from '../../component/modal';
import { Overlay } from '../../component/overly';
import { useCart } from '../../context/usecontext';

export const ManageMeal = () => {
  const [isActive, setIsActive] = useState("All");

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [triggerModal, setTriggerModal] = useState(false);

  const { updateMeal, deleteMeal, meals } = useCart();

  const [isChecked, setIsChecked] = useState(false);

  const [fileInput, setFileInput] = useState("No file chosen");

  const [newFile, setNewFile] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [response, setResponse] = useState("");

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

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
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

  const categories = [...new Set(meals.map((food) => food.category))];

  const filteredMeal = meals.filter((item) => {
    // 1. Check if it matches the active category
    const matchesCategory = isActive === "All" || item.category === isActive;

    // 2. Check if the name matches the search query
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Return true only if BOTH conditions are met
    return matchesCategory && matchesSearch;
  });
  // const filteredMeal = meals.filter(
  //   (item) => item.name.toLowerCase() === searchQuery.toLowerCase(),
  //   //isActive === "All" ? item : item.category === isActive,
  // );

  const filteredMain = meals.filter((item) => item.category === "main");
  const filteredGrills = meals.filter((item) => item.category === "Grills");
  const filteredDrinks = meals.filter((item) => item.category === "Drinks");

  const handleClick = (data) => {
    setIsActive(data);
  };

  const handleEdit = (meal) => {
    setModal((prev) => !prev);
    setIsChecked(meal.popularity);
    setFileInput(`${meal.image}`);
    setMealDetails({
      id: meal.id,
      name: meal.name,
      image: meal.image,
      category: meal.category,
      readyTime: meal.readyTime,
      price: meal.price,
      description: meal.description,
      rating: meal.rating,
      popularity: isChecked,
    });
  };

  //   handle file upload

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileInput(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      // This is the Base64 string of the image
      const base64String = reader.result;
      setMealDetails((prev) => ({
        ...prev,
        image: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (mealId) => {
    setTriggerModal((prev) => !prev);
    setDeleteId(mealId);
  };
  const handleYes = (id) => {
    deleteMeal(id);
    toast.error("Meal deleted from menu!");
    setTriggerModal(false);
  };
  const handleNo = () => {
    setTriggerModal(false);
  };
  //   const handleFileUpload = (e) => {
  //     const selectedFile = e.target.files[0];

  //     if (selectedFile) {
  //       setFileInput(selectedFile.name);
  //       setNewFile(selectedFile);
  //     }
  //   };

  //   useEffect(() => {
  //     console.log("worked-2");
  //     if (!newFile) return;
  //     const imageUrl = URL.createObjectURL(newFile);

  //     setMealDetails((prev) => ({
  //       ...prev,
  //       image: imageUrl,
  //     }));
  //     return () => {
  //       if (imageUrl) {
  //         URL.revokeObjectURL(imageUrl);
  //       }
  //     };
  //   }, [newFile]);

  //   const handleOnSubmit = (e) => {
  //     e.preventDefault();
  //     setModal((prev) => !prev);
  //   };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const finalMeal = {
      ...mealDetails,
      id: Date.now(), // Generate a unique ID for the demo
      price: Number(mealDetails.price), // Ensure price is a number
      rating: Number(mealDetails.rating),
      popularity: isChecked,
    };

    setTimeout(() => {
      updateMeal(finalMeal);

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
      setFileInput("No file chosen");
      setIsLoading(false);
      toast.success("Saved!");
    }, 2000);

    // 1. Call the context function
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 27, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className=" px-4.5 py-10 sm:px-10 lg:px-10 sm:py-9 bg-brandsurface overflow-hidden"
    >
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 my-3 text-sm sm:text-lg hover:bg-gray-400/10 w-fit p-2 rounded-xl"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        <p>Back</p>
      </div>
      <div className={`flex flex-col gap-1`}>
        <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-semibold`}>
          Meal Management
        </h2>
        <p className="text-white/75">
          Add, edit, and manage your resturant menu
        </p>
      </div>

      <section className="space-y-6 my-5">
        {/* input to search for meals to edit or delete */}
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-orange-400/30 outline-none rounded-xl py-2.5 px-4 bg-gray-400/7 placeholder:text-white/50  "
          placeholder="Search meals....."
        />
        <div className="flex flex-wrap whitespace-nowrap gap-3 mb-5">
          <CsButton
            text={`All`}
            action={() => handleClick(`All`)}
            className={`py-2 px-4.5 ${isActive === "All" ? "bg-amber-500/90 shadow-orange-400" : "bg-gray-400/10 hover:bg-orange-400/10 hover:text-orange-400/50 border border-orange-400/30"} rounded-xl`}
          />
          {categories.map((food, index) => (
            <div key={index}>
              <CsButton
                text={food}
                action={() => handleClick(food)}
                className={`py-2 px-4.5 ${isActive === food ? "bg-amber-500/90 shadow-lg shadow-orange-400/70 text-black/90" : "bg-gray-400/10 hover:bg-orange-400/10 hover:text-orange-400/50 border border-orange-400/30"} rounded-xl`}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-start gap-0.5 p-5.5 border border-orange-400/20 rounded-xl">
            <p className="text-sm text-white/50">Total Meals</p>
            <p className="text-4xl font-semibold text-white/90">
              {meals.length}
            </p>
          </div>
          <div className="flex flex-col items-start gap-0.5 p-5.5 border border-orange-400/20 rounded-xl">
            <p className="text-sm text-white/50">Main</p>
            <p className="text-4xl font-semibold text-white/90">
              {filteredMain.length}
            </p>
          </div>
          <div className="flex flex-col items-start gap-0.5 p-5.5 border border-orange-400/20 rounded-xl">
            <p className="text-sm text-white/50">Grills</p>
            <p className="text-4xl font-semibold text-white/90">
              {filteredGrills.length}
            </p>
          </div>
          <div className="flex flex-col items-start gap-0.5 p-5.5 border border-orange-400/20 rounded-xl">
            <p className="text-sm text-white/50">Drinks</p>
            <p className="text-4xl font-semibold text-white/90">
              {filteredDrinks.length}
            </p>
          </div>
        </div>
      </section>
      <section
        className={`${filteredMeal < 1 ? "w-full" : "space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center my-3"}`}
      >
        {filteredMeal.length === 0 ? (
          <div className="flex justify-center items-center text-center flex-col gap-3 bg-gray-400/10 text-red border border-orange-400/30 rounded-xl p-6 h-60 w-full">
            {/* <Package className="w-14 h-14" /> */}
            {searchQuery === "" ? (
              <p className="text-xl md:text-4xl text-white/70"> No Meal Yet</p>
            ) : (
              <p className="text-xl md:text-4xl text-white/70">
                {" "}
                Meal Not Found
              </p>
            )}
          </div>
        ) : (
          filteredMeal.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 27, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              key={item.id}
              className="flex flex-col gap-2 w-full max-h-120 bg-gray-400/10 border border-orange-400/20 rounded-xl"
            >
              <div className="h-1/2 overflow-hidden w-full rounded-t-xl  cursor-pointer group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full rounded-t-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="w-full max-h-1/2 p-5 flex flex-col  gap-2 items-start">
                <div className="flex justify-between gap-2 items-center w-full text-xl text-white/90 font-semibold">
                  <p>{item.name} </p>
                  <span>₦{item.price.toLocaleString()} </span>
                </div>
                <div className="flex items-start p-1.5 bg-gray-400/10 rounded-xl text-sm text-white/60">
                  {item.category}
                </div>
                <p className="text-white/60 line-clamp-3">{item.description}</p>
                <div className="flex justify-between items-center gap-2 w-full text-white/50">
                  <div className="flex items-center gap-2">
                    <Star
                      fill="#995200"
                      className="text-orange-400/40 w-4 h-4"
                    />
                    <p>{item.rating} </p>
                  </div>
                  <div>
                    <p> {item.readyTime}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full my-3">
                  <CsButton
                    text={`Edit`}
                    Icon={EditIcon}
                    iconColor={`w-4 h-4`}
                    action={() => handleEdit(item)}
                    className={`flex justify-center items-center gap-2 py-1.5 px-2.5 w-full font-semibold`}
                  />
                  <CsButton
                    text={`Delete`}
                    action={() => handleDelete(item)}
                    Icon={Trash2}
                    iconColor={`w-4 h-4`}
                    className={`flex justify-center items-center gap-2 py-1.5 px-2.5 w-full font-semibold text-red-400 bg-red-400/10 hover:bg-red-500/30 rounded-xl`}
                  />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </section>
      {modal && (
        <>
          {/* The Overlay  */}
          <Overlay isOpen={modal} toggleOverlay={handleEdit} />

          {/* Modal Content goes here */}
          <Form
            action={handleOnSubmit}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-brandsurface w-[90%] sm:w-140 h-130 p-6 overflow-y-auto shadow-2xl border border-orange-400/20 rounded-xl`}
          >
            <FormHeader
              className={`flex justify-between gap-2 my-3.5 mb-4 text-3xl font-semibold`}
            >
              <p>Edit Meal</p>
              <CsButton
                Icon={XIcon}
                iconColor={`w-5 h-5`}
                action={handleEdit}
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
                  {fileInput}
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
                action={handleEdit}
                className={`flex justify-center items-center p-3 w-full bg-gray-400/20 hover:bg-gray-400/50 rounded-xl text-white/60 font-semibold`}
              />
              <CsButton
                text={`${isLoading ? "Saving..." : "Save"}`}
                action={handleOnSubmit}
                Icon={Save}
                iconColor={`w-4 h-4`}
                className={`flex justify-center items-center gap-2 p-3 w-full bg-green-400/75 hover:bg-green-400/50 font-semibold rounded-xl text-white/90`}
              />
            </div>
          </Form>
        </>
      )}
      {triggerModal && (
        <>
          {/* The Overlay  */}
          <Overlay isOpen={triggerModal} toggleOverlay={handleDelete} />
          <Modal warning={`Are you want to delete ${deleteId.name}`}>
            <div className="flex gap-3">
              <CsButton
                text={`Yes`}
                action={() => handleYes(deleteId.id)}
                className={`flex justify-center items-center gap-2 p-2 w-full bg-red-400/35 hover:bg-red-400/20 font-semibold rounded-xl text-red-500`}
              />
              <CsButton
                text={`No`}
                action={handleNo}
                className={`flex justify-center items-center gap-2 p-2 w-full hover:bg-gray-400/10 font-semibold rounded-xl`}
              />
            </div>
          </Modal>
        </>
      )}
    </motion.div>
  );
};
