import { TextField, Typography, Button, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../services/authService";
import { toast } from "react-toastify";
import axios from "axios";

const Form1 = () => {
  // const [Username, setUsername] = useState("");
  // const [Password, setPassword] = useState("");
  const [UserDetails, setUserDetails] = useState({
    Username: "",
    Password: "",
  });

  const [userData, setUserData] = useState();

  const getData = async () => {
    await axios
      .get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${625}`)
      .then((res) => setUserData(res.data.result));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("1111", userData);

  const validationSchema = Yup.object().shape({
    Username: Yup.string().required("Username should not be empty."),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Email is not valid.")
      .required("Email should not be empty."),
    age: Yup.number().min(18),
    Password: Yup.string().min(8).required("Password should not be empty."),
  });

  const handleSubmit = async (values) => {
    // console.log("Username: ", UserDetails.Username);
    // console.log("Password: ", UserDetails.Password);

    const payload = {
      firstname: values.Username,
      lastname: "test",
      email: values.email,
      roleId: 2,
      password: values.Password,
    };

    // await authService
    //   .Register(payload)
    //   .then((response) => {
    //     if (response && response.code === 200) {
    //       toast("Data submitted successfully!");
    //     }
    //   })
    //   .catch(() => {});

    await axios
      .post("https://book-e-sell-node-api.vercel.app/api-user", payload)
      .then((response) => {
        if (response && response.code === 200) {
          toast("Data submitted successfully!");
        }
      })
      .catch((error) => {
        toast("unable to submit the data");
      });
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
        // console.log("Error :", errors);
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
