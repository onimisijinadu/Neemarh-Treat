import {
  Form,
  FormHeader,
  FormInput,
} from './form';

export const LoginForm = (isLogin) => {
  if (!isLogin) return null;
  //   const handleSubmit = (e) => {
  //     e.PreventDefault();
  //     setModal(false);
  //   };
  return (
    <>
      {isLogin && (
        <Form
          BtnText={`Log In`}
          //option={}
          btnStyle={`w-full`}
          className={"bg-transparent"}
        >
          <FormHeader className={`font-bold mb-5 text-center`}>
            Login
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
          </div>
        </Form>
      )}
    </>
  );
};
