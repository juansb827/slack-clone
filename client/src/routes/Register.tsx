import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";
import { tsPropertySignature } from "@babel/types";
import { cycleErrorMessage } from "graphql/validation/rules/NoFragmentCycles";

const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const Register = props => {
  const [formState, setFormState] = useState({
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    errors: null
  });

  const {
    username,
    usernameError,
    email,
    emailError,
    password,
    passwordError,
    errors
  } = formState;

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [register, { data, loading, error }] = useMutation(REGISTER_USER);

  const onSubmitHandler = async () => {
    setFormState(prevState => ({
      ...prevState,
      usernameError: "",
      emailError: "",
      passwordError: "",
      errors: null
    }));

    const response = await register({ variables: formState });
    const { ok, errors } = response.data.register;
    if (ok) {
      props.history.push("/");
    } else {
      const errs: any = {};
      errors.forEach(err => (errs[err.path] = err.message));
      setFormState(prevState => ({
        ...prevState,
        errors: errs
      }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container text>
      <Header as="h2">Header</Header>
      <Input
        name="username"
        value={username}
        error={!!(errors && errors.username)}
        onChange={onChangeHandler}
        placeholder="Username"
        fluid
      />
      <Input
        name="email"
        value={email}
        error={!!(errors && errors.email)}
        onChange={onChangeHandler}
        placeholder="Email"
        fluid
      />
      <Input
        name="password"
        value={password}
        error={!!(errors && errors.password)}
        onChange={onChangeHandler}
        placeholder="Password"
        type="password"
        fluid
      />
      <Button onClick={onSubmitHandler}>Submit</Button>
      {JSON.stringify(data)}
      {errors && <Message
        error
        header="There was some errors with your submission"
        list={Object.keys(errors).map(key => errors[key])}
      />}
    </Container>
  );
};

export default Register;
