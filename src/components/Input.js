import React from 'react';
import classNames from "classnames";

const Input = ({ id, name, label, placeholder, icon, borderColor, focusColor }) => {
    const inputClasses = classNames(
        "block",
        "w-full",
        "appearance-none",
        "rounded-md",
        "border",
        `border-${borderColor}`,
        "px-3",
        "py-2",
        "placeholder-gray-400",
        "shadow-sm",
        "focus:border-green-500",
        "focus:outline-none",
        `focus:ring-${focusColor}`,
        "sm:text-sm"
      );
      return (
        <div>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={icon} alt="icon" className="h-5 w-5" />
              </div>
            )}
            <input
              id={id}
              name={name}
              type="password"
              placeholder={placeholder}
              autoComplete="current-password"
              required
              className={inputClasses}
            />
          </div>
        </div>
      );
}

export default Input