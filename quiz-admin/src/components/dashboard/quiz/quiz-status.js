import { useState } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { Button, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { useDialog } from "../../../hooks/use-dialog";
import { Duplicate as DuplicateIcon } from "../../../icons/duplicate";
import { Eye as EyeIcon } from "../../../icons/eye";
import { ActionList } from "../../action-list";
import { ActionListItem } from "../../action-list-item";
import { ConfirmationDialog } from "../../confirmation-dialog";
import { StatusSelect } from "../../status-select";

const statusOptions = [
  {
    color: "info.main",
    label: "Draft",
    value: "draft",
  },
  {
    color: "success.main",
    label: "Published",
    value: "published",
  },
];

export const ProductStatus = (props) => {
  const { product, ...other } = props;
  const [duplicateDialogOpen, handleOpenDuplicateDialog, handleCloseDuplicateDialog] = useDialog();
  const [status, setStatus] = useState(product.status);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSaveChanges = () => {
    toast.success("Changes saved");
  };

  const handlePreview = () => {
    toast.error("This action is not available on demo");
  };

  const handleDuplicate = () => {
    handleCloseDuplicateDialog();
    toast.error("This action is not available on demo");
  };

  return (
    <>
      <Card {...other}>
        <CardHeader title="ProductLayout Status"
variant="outlined" />
        <Divider />
        <CardContent>
          <StatusSelect onChange={handleStatusChange}
options={statusOptions}
value={status} />
          <Button color="primary"
onClick={handleSaveChanges}
sx={{ mt: 2 }}
variant="contained">
            Save Changes
          </Button>
        </CardContent>
        <Divider />
        <ActionList>
          <ActionListItem icon={EyeIcon}
label="Preview"
onClick={handlePreview} />
          <ActionListItem
            icon={DuplicateIcon}
            label="Duplicate"
            onClick={handleOpenDuplicateDialog}
          />
        </ActionList>
      </Card>
      <ConfirmationDialog
        message="Are you sure you want to duplicate this product? This can't be undone."
        onCancel={handleCloseDuplicateDialog}
        onConfirm={handleDuplicate}
        open={duplicateDialogOpen}
        title="Duplicate ProductLayout"
        variant="warning"
      />
    </>
  );
};

ProductStatus.propTypes = {
  product: PropTypes.object,
};
