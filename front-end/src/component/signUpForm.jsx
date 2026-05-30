import {
  Form,
  FormHeader,
  FormInput,
} from './form';

export const SignUpForm = ({
  handleOnSubmit,
  password,
  confirmPassword,
  email,
  name,
  handleChange,
}) => {
  // if (!isOpen) return null;
  // const [isOpen, setIsOpen] = useState(false);
  //   const handleSubmit = (e) => {
  //     e.PreventDefault();
  //     setModal(false);
  //   };
  return (
    <>
      <Form
        BtnText={`Create Account`}
        action={handleOnSubmit}
        btnStyle={`w-full`}
        className={"bg-transparent"}
      >
        <FormHeader className={`font-bold mb-5 text-center`}>
          Create Free Account
        </FormHeader>
        <div className="flex flex-col gap-3">
          <FormInput
            inputType={"email"}
            inputName={"email"}
            inputValue={email || ""}
            labelName={"userEmail"}
            onChange={handleChange}
            //className,
            //optionalClassName,
            //labelClassName,
          >
            Email
          </FormInput>
          <FormInput
            inputType={"text"}
            inputName={"name"}
            inputValue={name || ""}
            labelName={"fullName"}
            onChange={handleChange}
            //className,
            //optionalClassName,
            //labelClassName,
          >
            Full Name
          </FormInput>
          <FormInput
            inputType={"password"}
            inputName={"password"}
            inputValue={password || ""}
            labelName={"userPassword"}
            onChange={handleChange}
            //className,
            //optionalClassName,
            //labelClassName,
          >
            Password
          </FormInput>
          <FormInput
            inputType={"password"}
            inputName={"confirmPassword"}
            inputValue={confirmPassword || ""}
            labelName={"userConfirmPassword"}
            onChange={handleChange}
            //className,
            //optionalClassName,
            //labelClassName,
          >
            ConfirmPassword
          </FormInput>
        </div>
      </Form>
    </>
  );
};
