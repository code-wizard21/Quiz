import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import { InputField } from "../../input-field";
import React, { useCallback, useEffect, useState } from "react";
import axiosClient from "../../../api/axiosinstance";
import { AutocompleteField } from "../../autocomplete-field";
// import { DateField } from "../../../components/date-field";


export const ProductCreateDialog = (props) => {
  const { open, onClose, editData, ...other } = props;
  const [images, setImages] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [hostList, setHostList] = useState([]);

  const getAllCategories = useCallback(async () => {

      axiosClient      
      .get("/categories")
      .then((response) => {
        if (response?.data?.data?.results) {
          const data = response?.data?.data?.results?.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          setCategoryList(data);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  const getAllHost = useCallback(async () => {
    axiosClient
    .get("/users?role=host")
    .then((response) => {
      if (response?.data?.data?.results ) {
        const  data = response?.data?.data?.results?.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        console.log('responsedata',data)
        setHostList(data);
      }
    })
    .catch(() => {
      toast.error("Something went wrong");
    });
}, []);


  useEffect(async () => {
    try {
    
      getAllCategories();
      getAllHost();
    } catch (error) {
      console.log('error',error);
    }
  }, []);


  const formik = useFormik({
    initialValues: {
      description: "",
      host: "",
      category: "",
      startDate: "",
      isPaid: false,
      status: { value: true, label: "Active" },
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().max(500).required("Description is required"),
      host: Yup.object().required("Host is required"),
      category: Yup.object().required("category is required"),
      startDate: Yup.date().required("startDate is required"),
      isPaid: Yup.boolean().required("isPaid is required"),
      status: Yup.object().required("status is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success("ProductLayout created");
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        // helpers.resetForm();
        // onClose?.();
        if (!editData) {
          const data = new FormData();
          data.append("type", "popup");
          data.append("file", images[0].file);
          await axiosInstance
            .post("upload/file", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(async (res) => {
              const uploadedImage = res?.data;
              const payload = {
                description: values.description,
                host: values.host.value,
                category: values.category.value,
                startDate: values.startDate,
                body: values.body,
                status: values.status.value,
              };
              await axiosInstance.post("popup", payload);
              helpers.resetForm();
              onClose?.(true);
            });
        } else {
          let imageData;
          if (images.length > 0 && images[0].file) {
            const data = new FormData();
            data.append("type", "popup");
            data.append("file", images[0].file);
            const res = await axiosInstance.post("upload/file", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            imageData = res?.data.url;
          }

          const payload = {
            description: values.description,
            host: values.host,
            category: values.category,
            startDate: values.startDate,
            body: values.body,
            cta: values.cta,
            status: values.status.value,
          };

          await axiosInstance.patch(`popup/${editData.id}`, payload);
          helpers.resetForm();
          onClose?.(true);
        }
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  // const setSelectedImageForUpload = (image) => {
  //   setImages(image);
  // };

  React.useEffect(() => {
    if (editData) {
      formik.setValues({
        description: editData.description,
        host: {
          value: editData.host,
          label: hostList.find((a) => a.value === editData.host)?.label,
        },
        category: {
          value: editData.category,
          label: categoryList.find((a) => a.value === editData.category)?.label,
        },
        startDate: editData.startDate,
        status: { value: editData.status, label: editData.status ? "Active" : "Inactive" },
      });
    }
  }, [editData]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: () => formik.resetForm(),
      }}
      {...other}
    >
      <DialogTitle>Create Quiz</DialogTitle>
    
    </Dialog>
  );
};

ProductCreateDialog.defaultProps = {
  open: false,
};

ProductCreateDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
