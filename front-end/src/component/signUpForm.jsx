import {
  Form,
  FormHeader,
  FormInput,
} from './form';

export const SignUpForm = (isOpen) => {
  if (!isOpen) return null;
  // const [isOpen, setIsOpen] = useState(false);
  //   const handleSubmit = (e) => {
  //     e.PreventDefault();
  //     setModal(false);
  //   };
  return (
    <>
      {isOpen && (
        <Form
          BtnText={`Create Account`}
          //option={}
          btnStyle={`w-full`}
          className={"bg-transparent"}
        >
          <FormHeader className={`font-bold mb-5 text-center`}>
            Create Free Account
          </FormHeader>
          <div className="flex flex-col gap-3">
            <FormInput
              inputType={"email"}
              inputName={"userEmail"}
              // inputValue={""}
              labelName={"userEmail"}
              //onChange
              //className,
              //optionalClassName,
              //labelClassName,
            >
              Email
            </FormInput>
            <FormInput
              inputType={"text"}
              inputName={"userName"}
              // inputValue={""}
              labelName={"userName"}
              //onChange
              //className,
              //optionalClassName,
              //labelClassName,
            >
              Username
            </FormInput>
            <FormInput
              inputType={"password"}
              inputName={"userPassword"}
              // inputValue={""}
              labelName={"userPassword"}
              //onChange
              //className,
              //optionalClassName,
              //labelClassName,
            >
              Password
            </FormInput>
            <FormInput
              inputType={"password"}
              inputName={"userConfirmPassword"}
              // inputValue={""}
              labelName={"userConfirmPassword"}
              //onChange
              //className,
              //optionalClassName,
              //labelClassName,
            >
              ConfirmPasword
            </FormInput>
          </div>
        </Form>
      )}
    </>
  );
};
