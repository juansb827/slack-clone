import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Container, Header, Input, Button } from "semantic-ui-react";

const Register = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = formState;
  
  const onChangeHandler = e => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const [register, { data, loading, error }] = useMutation(gql`
    mutation($username: String!, $email: String!, $password: String!) {
      register(username: $username, email: $email, password: $password)
    }
  `);

  const onSubmitHandler = () => register({ variables: formState });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container text>
      <Header as="h2">Header</Header>
      <Input
        name="username"
        value={username}
        onChange={onChangeHandler}
        placeholder="Username"
        fluid
      />
      <Input
        name="email"
        value={email}
        onChange={onChangeHandler}
        placeholder="Email"
        fluid
      />
      <Input
        name="password"
        value={password}
        onChange={onChangeHandler}
        placeholder="Password"
        type="password"
        fluid
      />
      <Button onClick={onSubmitHandler}>Submit</Button>
    </Container>
  );
};

export default Register;
