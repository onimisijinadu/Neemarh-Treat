import { useState } from 'react';

import { toast } from 'react-toastify';

import {
  Form,
  FormHeader,
  FormInput,
} from '../../../component/form';
import { useAuth } from '../../../context/usecontext';

export const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    name: user?.name || "",
    address: user?.address || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const savedUser = JSON.parse(localStorage.getItem("Users"));
    if (!savedUser) {
      toast.error("user not found!");
    }

    const updatedUser = savedUser.map((acc) => {
      if (acc.email === userDetails.email) {
        return {
          ...acc,
          ...userDetails,
        };
      }
      return acc;
    });
    setLoading(true);
    try {
      localStorage.setItem("Users", JSON.stringify(updatedUser));
      setUser((prev) => ({ ...prev, ...userDetails }));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        BtnText={`${loading ? "....." : isEditing ? "Save Changes" : "Edit Profile"}`}
        action={handleSave}
        btnDiv={`flex justify-start items-left w-123`}
        btnClass={` text-center w-full bg-orange-400/90 text-lg font-semibold py-3.5 rounded-xl text-white/90 hover:bg-orange-400/70 cursor-pointer mb-3`}
        className={
          "flex flex-col w-full md:w-175 lg:w-225 gap-3 bg-gray-900 my-6 pt-7 px-7 rounded-xl text-2xl font-bold"
        }
      >
        <FormHeader className="mb-5">Delivery Information</FormHeader>
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <FormInput
            labelName="customerName"
            inputName="name"
            inputType="text"
            disabled={!isEditing}
            inputValue={userDetails.name}
            onChange={handleChange}
          >
            Full Name
          </FormInput>
          <FormInput
            labelName="customerPhone"
            inputName="phone"
            inputType="tel"
            disabled={!isEditing}
            inputValue={userDetails.phone}
            onChange={handleChange}
          >
            Phone Number
          </FormInput>
        </div>
        <FormInput
          labelName="customerEmail"
          inputName="email"
          inputType="email"
          disabled={true}
          inputValue={userDetails.email}
          onChange={handleChange}
        >
          Email
        </FormInput>
        <FormInput
          labelName="deliveryAddress"
          inputName="address"
          inputType="text"
          disabled={!isEditing}
          inputValue={userDetails.address}
          onChange={handleChange}
        >
          Address
        </FormInput>
      </Form>
    </>
  );
};
