export const Form = ({ children, action, className, BtnText, btnStyle, option }) => {
  return (
    <form
      onSubmit={action}
      className={`${className ? className : "flex flex-col gap-3 my-4 p-7 border border-orange-400/60 rounded-xl bg-gray-400/10 text-2xl font-bold"}`}
    >
      {children}
      {BtnText && (
        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            className={`text-center w-full ${btnStyle ? btnStyle : "md:w-3/6 lg:w-3/9"}  bg-orange-400/90 text-lg font-semibold py-2 rounded-xl text-black/90 hover:bg-orange-400/70 cursor-pointer my-4`}
          >
            {BtnText}
          </button>
          
        </div>
      )}
      <div className="w-full">{option}</div>
    </form>
  );
};
export const FormHeader = ({ children, className }) => {
  return <div className={`${className ? className : "mb-4"}`}>{children}</div>;
};
export const FormInput = ({
  children,
  inputType,
  inputName,
  inputValue,
  labelName,
  onChange,
  max,
  min,
  step,
  className,
  optionalClassName,
  labelClassName,
  checked,
}) => {
  return (
    <div
      className={`${optionalClassName ? optionalClassName : "relative flex flex-col gap-3 w-full mb-4"}`}
    >
      <input
        type={inputType}
        id={labelName}
        name={inputName}
        onChange={onChange}
        value={inputValue}
        checked={checked}
        max={max}
        min={min}
        step={step}
        required
        placeholder=" "
        className={`${className ? className : "border border-orange-400/20 rounded-xl bg-gray-400/5 peer  focus:outline-none h-11 px-4 text-sm text-white/90"}`}
      />
      <label
        htmlFor={labelName}
        className={`${labelClassName ? labelClassName : "absolute left-4 font-medium text-lg pointer-events-none transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-lg  peer-focus:bg-gray-900/70  peer-focus:rounded-xl peer-focus:px-2 peer-valid:-top-4 peer-valid:text-lg  peer-valid:bg-gray-900/70  peer-valid:rounded-xl peer-valid:px-2"}`}
      >
        {children}
      </label>
    </div>
  );
};
export const MessageArea = ({
  Label,
  inputName,
  inputValue,
  onChange,
  message,
  height,
}) => {
  return (
    <fieldset className={`border border-orange-400/30 w-full px-7 rounded-xl`}>
      <legend className={`border-0 font-medium text-lg`}>{Label}</legend>
      <textarea
        name={inputName}
        value={inputValue}
        onChange={onChange}
        className={` w-full outline-0 text-sm ${height ? height : "h-49"} resize-none text-white py-3`}
        max={`200`}
        placeholder={`${message ? message : "Your Message Here....."}`}
      ></textarea>
    </fieldset>
  );
};
//     <div className={`flex flex-wrap md:flex-nowrap items-center gap-4 w-full font-medium text-xl `}>
//    </div>
// <div className={`flex flex-col text-lg font-medium`}>

// </div>
