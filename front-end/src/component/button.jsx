import { motion } from 'motion/react';

export const CsButton = ({
  text,
  Icon,
  iconColor,
  action,
  className,
  state = false,
  textStyle,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -5, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.6,
        delay: 0.3,
      }}
      type="button"
      className={className}
      onClick={action}
      disabled={state}
    >
      {Icon && <Icon className={` ${iconColor ? iconColor : "w-4 h-4"}`} />}
      <p className={textStyle}>{text}</p>
    </motion.button>
  );
};
