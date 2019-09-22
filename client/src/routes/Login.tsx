// Render Prop
import React from "react";
import { Formik } from "formik";
import { Form, Message, Header, Container } from "semantic-ui-react";

const Basic = () => (
      
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={values => {
        let errors: any = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        const password = values.password;
        if (!password) {
          errors.password = "Password is required";
        } else if (password.length < 5  || password.length > 50) {
          errors.password = "Invalid password length";
        }


        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Container text>
        <Header as="h2">Login</Header>
        <Form error>          
          <Form.Input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={!!(errors.email && touched.email)}
            fluid
          />
          {errors.email && touched.email &&
            <Message
              error              
              content={errors.email}
            />
          }
          <Form.Input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={!!(errors.password && touched.password)}
            fluid
          />
           {errors.password && touched.password &&
            <Message
              error              
              content={errors.password}
            />
          }

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>                   
        </Form>
        </Container>
      )}
    </Formik>  
);

export default Basic;
