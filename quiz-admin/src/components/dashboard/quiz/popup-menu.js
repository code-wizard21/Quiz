import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { usePopover } from "../../../hooks/use-popover";
import { DotsVertical as DotsVerticalIcon } from "../../../icons/dots-vertical";
import axiosInstance from "../../../api/axiosinstance";
import Swal from "sweetalert2";

export const PopupMenu = (props) => {
  const router = useRouter();
  const [anchorRef, open, handleOpen, handleClose] = usePopover();
  const { product, updateList, handleEdit } = props;

  const handleDelete = async (e) => {
    e.stopPropagation();
    handleClose();
    Swal.fire({
      title: "Are you sure you want to delete this Popup?",
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosInstance.delete(`popup/${product.id}`);
        toast.success("Product deleted");
        updateList(product.id);
      }
    });
  };

  const handle = (e) => {
    e.stopPropagation();
    handleOpen(e);
  };

  return (
    <>
      <IconButton onClick={handle} ref={anchorRef} {...props}>
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
        <MenuItem onClick={() => handleEdit(product.id)}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
