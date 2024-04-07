import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, FormHelperText, Grid, Typography } from "@mui/material";
import { useMounted } from "../../hooks/use-mounted";
import { useAuth } from "../../hooks/use-auth";
import { InputField } from "../input-field";

export const AmplifyPasswordRecovery = (props) => {
  const isMounted = useMounted();
  const { passwordRecovery } = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await passwordRecovery(values.email);

        if (isMounted()) {
          sessionStorage.setItem("username", values.email);
          router.push("/authentication/password-reset").catch(console.error);
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

  return (
    <form noValidate
onSubmit={formik.handleSubmit}
{...props}>
      <Grid container
spacing={2}>
        <Grid item
xs={12}>
          <Typography color="textPrimary"
variant="h4">
            Forgot password
          </Typography>
        </Grid>
        <Grid item
xs={12}>
          <Typography color="textPrimary"
variant="body1">
            Enter the email address you used when you joined and we’ll send you instructions to
            reset your password.
          </Typography>
        </Grid>
        <Grid item
xs={12}>
          <InputField
            autoFocus
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
            Send Verification Email
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
