import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';

import { FoodGallery } from '../data/foodGallery';

// import toast, { Toaster } from 'react-hot-toast';

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");

    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [delivery, setDelivery] = useState([]);

  const [meals, setMeals] = useState(() => {
    const savedMeals = localStorage.getItem("NeamahsMeals");
    return savedMeals ? JSON.parse(savedMeals) : FoodGallery;
  });
  // 2. Sync State to LocalStorage whenever 'meals' changes
  useEffect(() => {
    localStorage.setItem("NeamahsMeals", JSON.stringify(meals));
  }, [meals]);

  const addMeal = (newMeal) => {
    const meal = [newMeal, ...meals];
    setMeals(meal);
    localStorage.setItem("NeamahsMeals", JSON.stringify(meal));
  };
  const updateMeal = (mealToUpdate) => {
    //[newMeal, ...meals];
    setMeals((prevData) =>
      prevData.map((meal) =>
        meal.id === mealToUpdate.id
          ? {
              ...mealToUpdate,
            }
          : meal,
      ),
    );

    const updatedMeal = meals;

    localStorage.setItem("NeamahsMeals", JSON.stringify(updatedMeal));
  };

  const deleteMeal = (mealId) => {
    const updatedMeals = meals.filter((meal) => meal.id !== mealId);
    if (!updatedMeals) {
      toast.error("Meal does not exit..");
      return;
    } else {
      setMeals(updatedMeals);
      localStorage.setItem("NeamahsMeals", JSON.stringify(updatedMeals));
    }
  };

  // This will run EVERY time the cart array changes
  useEffect(() => {
    // Pro Tip: Use console.table for a beautiful view of your food items
    if (cart.length > 0) {
      console.table(cart);
    }
  }, [cart]);

  // useEffect(() => {
  //   const savedOrders = localStorage.getItem("orders");
  //   if (savedOrders) {
  //     setDelivery(JSON.parse(savedOrders));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("orders", JSON.stringify(delivery));
  // }, [delivery]);

  // function to add to cart
  const addToCart = (product, quantity) => {
    if (!product || !product.id) return;
    setCart((cartItems) => {
      // check if item already exist
      const existingItem = cartItems.find((item) => item.id === product.id);

      // if item exist, update the quantity
      if (existingItem) {
        return cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      //   if it doesnt exist, add the product object and its quantity
      return [...cartItems, { ...product, quantity }];
    });
  };

  //   function to detele item from cart
  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product));
  };

  //   function to clear cart

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // const addDeliveryDetails = (details, orderId, date) => {
  //   if (!details) return;
  //   setDelivery((details) => {
  //     // find it it already exist
  //     const itExists = delivery.find((item) => item.id === orderId);
  //     if (itExists) {
  //       toast.error("Order already placed...");
  //     }
  //     return [...details, { orderId: orderId, date: date }];
  //   });
  // };
  const addDeliveryDetails = (details, products, orderId, date) => {
    if (!details) return;

    // Check if order already exists BEFORE calling the setter
    const itExists = delivery.find((item) => item.orderId === orderId);
    if (itExists) {
      toast.error("Order already placed...");
      return; // Stop here if it exists
    }

    setDelivery((prevDelivery) => [
      ...prevDelivery,
      {
        ...details, // This spreads customerName, customerPhone, deliveryAddress
        orderId: orderId,
        products: products,
        date: date.toLocaleString(), // Format the date so it's a string
        status: "Pending", // Good to add a default status for your dashboard cards!
      },
    ]);
  };

  // const finalPrice = cart.reduce
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        setCart,
        addDeliveryDetails,
        delivery,
        setDelivery,
        addMeal,
        meals,
        deleteMeal,
        updateMeal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("activeUser"));
    return savedUser ? savedUser : null;
  });
  const logIn = (userData) => {
    const savedUsers = JSON.parse(localStorage.getItem("Users")) || [];

    if (!savedUsers) {
      throw new Error(
        "No accounts found on this device. Please sign up first!",
      );
    }

    const existingUser = savedUsers.find(
      (user) => user.email.toLowerCase() === userData.email.toLowerCase(),
    );

    // const matchEmail =
    //   existingUser.email.toLowerCase() === userData.email.toLowerCase();
    // const matchPassword = existingUser.password === userData.password;

    if (!existingUser || existingUser.password !== userData.password) {
      throw new Error("Invalid email or password. Please try again.");
    }
    try {
      setUser(existingUser);
      localStorage.setItem("activeUser", JSON.stringify(existingUser.email));
      // setShowLoginModal(false);
    } catch (err) {
      throw err;
    } finally {
      setShowLoginModal(false);
      toast.success(`Welcome back, ${existingUser.name}!`);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("activeUser");
    toast.success("Logged out successfully.");
  };

  const createUser = (userData) => {
    // Get the user array or start with a new Array
    const newAccount = JSON.parse(localStorage.getItem("Users")) || [];

    const existingAccount = newAccount.some(
      (acc) => acc.email.toLowerCase() === userData.email.toLowerCase(),
    );

    if (existingAccount) {
      toast.error("Email already exists");
    }
    try {
      // Save to localStorage first (Synchronous and bulletproof)

      newAccount.push(userData);
      localStorage.setItem("Users", JSON.stringify(newAccount));
      // Update global React state
      setUser(userData);
      // Save the user as active on the local Storage,
      localStorage.setItem("activeUser", JSON.stringify(userData.email));
    } catch (err) {
      console.error("Local storage error:", err);
      throw err; // Throws error up to your handleSubmit try/catch block
    } finally {
      setShowLoginModal(false);
      toast.success("Account created successfully!");
    }
  };

  const AuthWithGoogle = (userData) => {
    const googleUser = {
      email: userData.email,
      name: userData.name,
      auth_method: "google",
      google_id: userData.sub,
    };

    const existingAccount = JSON.parse(localStorage.getItem("Users")) || [];

    const existingUser = existingAccount.some(
      (acc) => acc.email === googleUser.email,
    );

    try {
      if (existingUser) {
        setUser(googleUser);

        localStorage.setItem("activeUser", JSON.stringify(googleUser));

        setShowLoginModal(false);
        toast.success("Logged in successfully!");
      } else {
        existingAccount.push(googleUser);

        localStorage.setItem("Users", JSON.stringify(existingAccount));

        setUser(googleUser);

        localStorage.setItem("activeUser", JSON.stringify(googleUser));
        setShowLoginModal(false);
        toast.success("Logged in successfully!");
      }
    } catch (err) {
      toast.error("Error occurred while logging in with Google.");
      throw err;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        logIn,
        user,
        logOut,
        createUser,
        setShowLoginModal,
        showLoginModal,
        AuthWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
