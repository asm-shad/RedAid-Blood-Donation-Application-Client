import PropTypes from "prop-types";

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        px-4
        w-full
        ${
          outline
            ? "bg-white text-black border-black"
            : "bg-gradient-to-r from-red-500 to-red-700 text-white"
        }
        ${outline ? "border-[1px]" : "border-0"}
        ${small ? "text-sm py-1 font-light" : "text-md py-3 font-semibold"}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  icon: PropTypes.elementType,
  type: PropTypes.string,
};

export default Button;
