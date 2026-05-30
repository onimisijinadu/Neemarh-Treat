import {
  Form,
  FormHeader,
  FormInput,
} from './form';

export const LoginForm = ({
  handleOnSubmit,
  email,
  password,
  handleChange,
}) => {
  // if (!isLogin) return null;

  return (
    <>
      <Form
        BtnText={`Log In`}
        action={handleOnSubmit}
        //option={}
        btnStyle={`w-full`}
        className={"bg-transparent"}
      >
        <FormHeader className={`font-bold mb-5 text-center`}>Login</FormHeader>
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
        </div>
      </Form>
    </>
  );
};
