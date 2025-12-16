/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Input } from "../elements";
import { IoSearchOutline } from "react-icons/io5";

interface SearchWidgetProps {
  refetch?: any;
  searchText?: string;
  setSearchText?: any;
  placeholder?: string;
}

const SearchWidget = ({
  refetch,
  searchText,
  setSearchText,
  placeholder,
}: SearchWidgetProps) => {
  const searchTable = () => {
    if (refetch) refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchTable();
    }
  };

  useEffect(() => {
    if (searchText === "") {
      refetch?.();
    }
  }, [refetch, searchText]);

  return (
    <div className="flex-1">
      <Input
        type="text"
        value={searchText}
        onChange={(e: { target: { value: any } }) =>
          setSearchText(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Search"}
        left_icon={
          <IoSearchOutline
            className="text-[#32475C61] cursor-pointer"
            onClick={searchTable}
          />
        }
      />
    </div>
  );
};

export default SearchWidget;
