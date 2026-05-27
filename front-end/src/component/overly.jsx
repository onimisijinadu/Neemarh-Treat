// export const Overlay = ({ toggleOverlay, className }) => {
//   return (
//     <>
//       <div
//         onClick={toggleOverlay}
//         className={` ${className} inset-0 z-31 w-screen h-screen absolute bg-black/20 `}
//       ></div>
//     </>
//   );
// };

export const Overlay = ({ toggleOverlay, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={toggleOverlay}
      // Fixed ensures it covers the viewport even if you scroll
      // z-40 puts it below the mobile menu
      className={`fixed inset-0 z-30 w-screen h-full bg-black/40 backdrop-blur-sm transition-opacity duration-300 `}
    ></div>
  );
};
