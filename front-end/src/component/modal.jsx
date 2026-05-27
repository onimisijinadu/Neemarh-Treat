export const Modal = ({ warning, children }) => {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl bg-brandsurface text-sm sm:text-lg fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit whitespace-nowrap">
      <p>{warning}</p>
      <div>{children}</div>
    </div>
  );
};
