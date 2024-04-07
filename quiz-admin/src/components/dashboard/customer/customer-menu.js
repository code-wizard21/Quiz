import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { usePopover } from "../../../hooks/use-popover";
import { DotsVertical as DotsVerticalIcon } from "../../../icons/dots-vertical";
import axiosInstance from "../../../api/axiosinstance";

export const CustomerMenu = (props) => {
  const router = useRouter();
  const [anchorRef, open, handleOpen, handleClose] = usePopover();
  const { customer } = props;

  const handleDelete = async () => {
    await axiosInstance.delete(`users/${customer.id}`);
    toast.success("Product deleted");
    updateList(customer.id);
  };

  return (
    <>
      <IconButton onClick={handleOpen}
ref={anchorRef}
{...props}>
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
        {/* <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleReport}>Report</MenuItem> */}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
