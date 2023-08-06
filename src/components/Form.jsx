import { TextField, Typography, Button, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Form1 = () => {
  // const [Username, setUsername] = useState("");
  // const [Password, setPassword] = useState("");
  const [UserDetails, setUserDetails] = useState({
    Username: "",
    Password: "",
  });

  useEffect(() => {
    //if(userdetails.username){
    console.log("useffect called");
    //}
  }, []);

  const validationSchema = Yup.object().shape({
    Username: Yup.string().required("Username should not be empty."),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Email is not valid.")
      .required("Email should not be empty."),
    age: Yup.number().min(18),
    Password: Yup.string().min(8).required("Password should not be empty."),
  });

  const handleSubmit = (values) => {
    console.log("Username: ", UserDetails.Username);
    console.log("Password: ", UserDetails.Password);
  };
  return (
    <Formik
      initialValues={{ Username: "", age: "", email: "", Password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        handleSubmit,
      }) => {
        console.log("Error :", errors);
        return (
          <Form>
            <div className="form-demo">
              <Typography variant="h3" sx={{ color: "Red" }}>
                Registration Here!!
              </Typography>{" "}
              <TextField
                label="Username"
                name="Username"
                variant="outlined"
                error={errors.Username}
                // error={!!errors.Username && touched.Username}
                value={values.Username}
                onChange={(e) => setFieldValue("Username", e.target.value)}
                onBlur={handleBlur}
              />
              <FormHelperText error>
                <ErrorMessage name="Username" />
              </FormHelperText>
              <TextField
                label="email"
                name="email"
                variant="outlined"
                error={!!errors.email && touched.email}
                // error={errors.email}
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={handleBlur}
              />
              <FormHelperText error>
                <ErrorMessage name="email" />
              </FormHelperText>
              <TextField
                label="age"
                name="age"
                variant="outlined"
                error={errors.age}
                // error={!!errors.age && touched.age}
                value={values.age}
                onChange={(e) => setFieldValue("age", e.target.value)}
                onBlur={handleBlur}
              />
              <FormHelperText error>
                <ErrorMessage name="age" />
              </FormHelperText>
              <TextField
                label="Password"
                name="Password"
                variant="outlined"
                error={errors.Password}
                // error={!!errors.Password && touched.Password}
                value={values.Password}
                onChange={(e) => setFieldValue("Password", e.target.value)}
                onBlur={handleBlur}
              />
              <FormHelperText error>
                <ErrorMessage name="Password" />
              </FormHelperText>
              <Button variant="contained">Submit</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Form1;
