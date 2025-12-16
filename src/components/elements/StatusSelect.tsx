import { DropdownIcon } from "@/utilities/DropdownIcon";
import React, { ReactNode } from "react";
import { FaStarOfLife } from "react-icons/fa";
import Select from "react-select";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SelectDropdownTypes {
  defaultValue?: any;
  label?: string;
  labelClassName?: string;
  onChange?: any;
  styles?: string | any;
  disbaled?: boolean;
  options: { value: string | number; label: string }[];
  multiSelect?: any;
  textTransform?: string;
  error?: string | undefined;
  icon?: number;
  leftIcon?: ReactNode;
  placeholder?: string;
  required?: boolean;
}

const StatusSelect = React.forwardRef(function SelectDropdown(
  {
    label,
    labelClassName,
    defaultValue,
    onChange,
    styles,
    disbaled,
    options,
    multiSelect,
    textTransform,
    error,
    icon,
    leftIcon,
    placeholder,
    required,
    ...rest
  }: SelectDropdownTypes,
  ref
) {
  // select dropdown custom styles
  const selectCustomStyles = {
    menu: (provided: any) => ({
      ...provided,
      fontSize: "13px",
      textTransform: textTransform || "capitalize",
      zIndex: 100,
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: "#808080",
      fontSize: "13px",
    }),

    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      paddingLeft: leftIcon ? "32px" : "auto",
      paddingRight: "1px",
      minHeight: "30px",
      fontSize: "13px !important",
      border: `1px solid ${state.isFocused ? "#d1d5dc " : "#f3f4f6"}`,
      color: "#E7EDF2",
      borderRadius: "4px",
      textTransform: textTransform || "capitalize",
      boxShadow: "#0f172a",
      borderColor: state.isFocused ? "#ccc" : "#ccc", // keep border color constant
      "&:hover": {
        borderColor: "#ccc", // keep same on hover
      },
    }),

    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
      ...provided,
      zIndex: 100,
      fontSize: "13px",
      backgroundColor: state.isSelected
        ? "#0f172a" // your selected color
        : state.isFocused
        ? "#e6e9f0" // hover background
        : "transparent",
      cursor: "pointer",
      color: state.isSelected ? "#E7EDF2" : "",
      "&:active": {
        backgroundColor: "#0f172a", // remove click flash
        color: "#E7EDF2",
      },
    }),

    singleValue: (provided: any, state: { isDisabled: any }) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <div className="w-full">
      <div className="relative w-full flex gap-2 items-center">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-[50%] z-20 text-lg text-dark">
            {leftIcon}
          </div>
        )}
        <div className="relative flex-1">
          <Select
            isClearable
            components={{
              IndicatorSeparator: () => null, // remove the separator
              DropdownIndicator: () => null, // remove the arrow completely
            }}
            placeholder={placeholder || options?.[0]?.label}
            isDisabled={disbaled}
            defaultValue={defaultValue}
            onChange={onChange}
            styles={styles || selectCustomStyles}
            options={options}
            {...rest}
          />
        </div>
      </div>

      {error && <div className="ml-1 mt-2 text-sm text-red-500">{error}</div>}
    </div>
  );
});

export default StatusSelect;
