import React from "react";
import TextField from "@mui/material/TextField";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const handleSchema2 = object({
  username: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  email: string()
    .email("Lütfen geçerli bir email giriniz")
    .required("Email girişi zorunludur"),
  password: string()
    .required("Şifre zorunludur.")
    .min(8, "Şifre en az 8 karakter içermelidir")
    .max(16, "Şifre en falza 16 karakter içermelidir")
    .matches(/\d+/, "Şifre en az bir rakam içermelidir")
    .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .matches(
      /[@$!%*?&]+/,
      "Şifre en az bir özel karakter (@$!%*?&) içermelidir"
    ),
});

export const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  return (
    <>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="User Name"
            name="username"
            id="username"
            type="text"
            variant="outlined"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            label="First Name"
            name="firstName"
            id="firstName"
            type="text"
            variant="outlined"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            id="lastName"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={values.lastName}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            value={values.email}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="password"
            name="password"
            id="password"
            type="password"
            value={values.password}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Form>
    </>
  );
};

export default RegisterForm;
