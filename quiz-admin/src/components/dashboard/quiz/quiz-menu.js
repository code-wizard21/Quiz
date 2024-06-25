import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { usePopover } from "../../../hooks/use-popover";
import { DotsVertical as DotsVerticalIcon } from "../../../icons/dots-vertical";
import axiosInstance from "../../../api/axiosinstance";

export const ProductMenu = (props) => {
  const router = useRouter();
  const [anchorRef, open, handleOpen, handleClose] = usePopover();
  const { product, updateList } = props;

  const handleDelete = async () => {
    await axiosInstance.delete(`ask/${product.id}`);
    toast.success("Product deleted");
    updateList(product.id);
  };

  return (
    <>
      <IconButton onClick={handleOpen} 
      ref={anchorRef} {...props}>
        <DotsVerticalIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
