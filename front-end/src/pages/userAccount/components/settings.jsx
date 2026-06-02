import { useState } from 'react';

import { toast } from 'react-toastify';

import {
  Form,
  FormHeader,
  FormInput,
} from '../../../component/form';
import { useAuth } from '../../../context/usecontext';
import { PasswordValidation } from '../../../utils/validation';

export const Setting = () => {
  const { user } = useAuth();

  const [userDetails, setUserDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    console.log("click");

    const savedUser = JSON.parse(localStorage.getItem("Users"));
    if (!savedUser) {
      toast.error("user not found!");
    }
    console.log("1");
    console.log(userDetails.currentPassword);
    const invalid = PasswordValidation(
      userDetails.confirmPassword,
      userDetails.newPassword,
      userDetails.currentPassword,
      user.password,
    );

    if (!invalid.isvalid) {
      toast.error(invalid.errorMessage);
      return;
    }
    console.log("2");

    const updatedUser = savedUser.map((acc) => {
      if (acc.email === user.email) {
        return {
          ...acc,
          password: userDetails.newPassword,
        };
      }
      return acc;
    });
    console.log("3");
    setLoading(true);
    try {
      localStorage.setItem("Users", JSON.stringify(updatedUser));
      toast.success("password updated successfully!");
      console.log("4");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
    console.log("5");
  };
  return (
    <Form
      BtnText={`${loading ? "....." : "Update Password"}`}
      action={handleSave}
      btnDiv={`flex justify-start items-left w-full sm:w-123`}
      btnClass={` text-center w-full bg-orange-400/90 text-lg font-semibold py-3.5 rounded-xl text-white/90 hover:bg-orange-400/70 cursor-pointer mb-3`}
      className={
        "flex flex-col w-full md:w-175 lg:w-225 gap-3 bg-gray-900 my-6 pt-7 px-7 rounded-xl text-2xl font-bold"
      }
    >
      <FormHeader className="mb-5">Change Password</FormHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormInput
          labelName="currentPassword"
          inputName="currentPassword"
          inputType="password"
          inputValue={userDetails.currentPassword}
          onChange={handleChange}
        >
          Current Password
        </FormInput>
        <FormInput
          labelName="newPassword"
          inputName="newPassword"
          inputType="password"
          inputValue={userDetails.newPassword}
          onChange={handleChange}
        >
          New Password
        </FormInput>
        <FormInput
          labelName="confirmPassword"
          inputName="confirmPassword"
          inputType="password"
          inputValue={userDetails.confirmPassword}
          onChange={handleChange}
        >
          Confirm New Password
        </FormInput>
      </div>
    </Form>
  );
};
