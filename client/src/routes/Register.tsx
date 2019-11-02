import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { Container, Header, Input, Button, Message, Form } from 'semantic-ui-react';
import { pick } from 'lodash';
import { ErrorMessage } from 'formik';
const REGISTER_USER = gql`
    mutation($input: RegisterInput) {
        register(input: $input) {
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
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        errors: null,
    });

    const {
        username,
        usernameError,
        email,
        emailError,
        password,
        passwordError,
        errors,
    } = formState;

    const onChangeHandler = e => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [register, { data, loading, error }] = useMutation(REGISTER_USER);

    const onSubmitHandler = async () => {
        setFormState(prevState => ({
            ...prevState,
            usernameError: '',
            emailError: '',
            passwordError: '',
            errors: null,
        }));

        const response = await register({
            variables: {
                input: pick(formState, ['username', 'email', 'password']),
            },
        });
        const { ok, errors } = response.data.register;
        if (ok) {
            props.history.push('/');
        } else {
            const errs: any = {};
            errors.forEach(err => (errs[err.path] = err.message));
            setFormState(prevState => ({
                ...prevState,
                errors: errs,
            }));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Container text>
            <Form error onSubmit={onSubmitHandler}>
                <Header as="h2">Header</Header>
                <Form.Input
                    name="username"
                    value={username}
                    error={!!(errors && errors.username)}
                    onChange={onChangeHandler}
                    placeholder="Username"
                    fluid
                />
                <ErrorMessage name="username" component={Message} />
                <Form.Input
                    type="email"
                    name="email"
                    value={email}
                    error={!!(errors && errors.email)}
                    onChange={onChangeHandler}
                    placeholder="Email"
                    fluid
                />
                <Form.Input
                    name="password"
                    value={password}
                    error={!!(errors && errors.password)}
                    onChange={onChangeHandler}
                    placeholder="Password"
                    type="password"
                    fluid
                />
                <Button onClick={onSubmitHandler}>Submit</Button>

                {errors && (
                    <Message
                        error
                        header="There was some errors with your submission"
                        list={Object.keys(errors).map(key => errors[key])}
                    />
                )}
            </Form>
        </Container>
    );
};

export default Register;