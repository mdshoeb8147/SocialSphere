// const TextInput = React.forwardRef(
//   ({ type, placeholder, styles, labe, labelStyles, register, name, error }) => {
//     return <div>TextInput</div>;
//   }
// );
// export default TextInput;

import React from "react";
import PropTypes from "prop-types";

const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyles, register, name, error },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col mt-2 ">
        {/* <label style={labelStyles}>{label}</label> */}
        {label && (
          <p className={`text-slate-800 text-sm mb-2 ${labelStyles}`}>
            {label}
          </p>
        )}
        {/* <input
          type={type}
          placeholder={placeholder}
          style={styles}
          name={name}
          ref={ref}
          {...register}
        />
        {error && <div>{error}</div>} */}

        <div>
          <input
            type={type}
            placeholder={placeholder}
            // style={styles}
            name={name}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={`bg-blue-300 rounded border border-[#66666690] outline-none text-sm text-slate-600 px-4 py-3 placeholder:[#666]${styles}`}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  styles: PropTypes.string, // You may adjust this based on the expected type for styles
  label: PropTypes.string,
  labelStyles: PropTypes.string,
  register: PropTypes.object, // Adjust the shape based on the expected properties for register
  name: PropTypes.string,
  error: PropTypes.string,
};
// Adding the displayName property
TextInput.displayName = "TextInput";

export default TextInput;
