import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, FormHelperText, Grid, Typography } from "@mui/material";
import { useMounted } from "../../hooks/use-mounted";
import { useAuth } from "../../hooks/use-auth";
import { InputField } from "../input-field";

export const AmplifyVerifyCode = (props) => {
  const isMounted = useMounted();
  const { verifyCode } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: username,
      code: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await verifyCode(values.email, values.code);

        if (isMounted()) {
          router.push("/authentication/login").catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <form noValidate
onSubmit={formik.handleSubmit}
{...props}>
      <Typography color="textPrimary"
sx={{ mb: 3 }}
variant="h4">
        Verify code
      </Typography>
      <Grid container
spacing={2}>
        <Grid item
xs={12}>
          <InputField
            autoFocus
            disabled={!!username}
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
        </Grid>
        <Grid item
xs={12}>
          <InputField
            autoFocus={!!username}
            error={Boolean(formik.touched.code && formik.errors.code)}
            fullWidth
            helperText={formik.touched.code && formik.errors.code}
            label="Verification code"
            name="code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
          />
        </Grid>
        {formik.errors.submit && (
          <Grid item
xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}
        <Grid item
xs={12}>
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Verify Code
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
