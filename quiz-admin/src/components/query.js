import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search as SearchIcon } from "../icons/search";
import { useRouter } from "next/router";
import axiosClient from "../api/axiosinstance";
import { invoiceApi } from "../api/invoice";

const QueryRoot = styled("div")(({ theme }) => ({
  alignItems: "center",
  backgroundColor: "background.paper",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  height: 42,
  width: "100%",
}));

export const Query = (props) => {
  const router = useRouter();
  const { currentSearch } = router.query;
  const { search: querySearch } = router.query;
  const [searchInput, setSearchInput] = useState(querySearch || "");
  const { disabled, onChange, value, ...other } = props;
  const inputRef = useRef(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    setSearchInput(querySearch || "");
  }, [querySearch]);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const mainHandleChange = () => {
    console.log("ttt");
  };


  const handleChange =async (event) => {
    setSearchInput(event.target.value);
    setTempValue(event.target.value)
  };

 

const handleKeyUpEvent = (event) => {
    // Check if the 'Enter' key was pressed
    if (event.key === "Enter") {
      if (searchInput.trim() !== "") {
        router.push({
          pathname: currentSearch,
          query: { search: searchInput },
        });
        
      } else {
        router.push({
          pathname: currentSearch,
        });
      }
    }
  };

  return (
    <QueryRoot {...other}>
      <SearchIcon
        sx={{
          color: "text.secondary",
          ml: 2,
          mr: 1,
        }}
        fontSize="small"
      />
      <InputBase
        disabled={disabled}
        inputProps={{
          ref: inputRef,
          sx: {
            p: 0.75,
            "&::placeholder": {
              color: "text.secondary",
              opacity: 1,
            },
          },
        }}
        onChange={handleChange}
        onhandleChange={mainHandleChange}
        onKeyUp={handleKeyUpEvent}
        placeholder="Search..."
        sx={{ flex: 1 }}
        value={tempValue}
      />
    </QueryRoot>
  );
};

Query.defaultProps = {
  value: "",
};

Query.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
