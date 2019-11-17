// Render Prop
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { Formik, ErrorMessage } from 'formik';
import { Form, Message, Header, Container } from 'semantic-ui-react';
import { storeSessionTokens } from  '../common/auth.utils';

const LOGIN_USER = gql`
    mutation($input: LoginInput!) {
        login(input: $input) {
            ok
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }
`;

const Basic = (props): any => {
    const [login, { loading, error }] = useMutation(LOGIN_USER);
    const [initialValues, setInitialValues] = useState({
        email: '1',
        password: '1',
    });
    const onSubmitHandler = async (values, actions) => {
        console.log(values);
        setInitialValues(values);
        const response: any = await login({
            variables: {
                input: values,
            },
        });
        const { ok, token, refreshToken } = response.data.login;
        if (ok) {
            storeSessionTokens(token, refreshToken);
            props.history.push('/');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {JSON.stringify(error)}</p>;
    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                let errors: any = {};
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                const password = values.password;
                if (!password) {
                    errors.password = 'Password is required';
                } else if (password.length < 5 || password.length > 50) {
                    errors.password = 'Invalid password length';
                }

                return errors;
            }}
            onSubmit={onSubmitHandler}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <Container text>
                    <Header as="h2">Login {JSON.stringify(initialValues)} </Header>
                    <Form error onSubmit={handleSubmit}>
                        <Form.Input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={!!(errors.email && touched.email)}
                            fluid
                        />
                        <ErrorMessage name="email" component={Message} />

                        <Form.Input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={!!(errors.password && touched.password)}
                            fluid
                        />
                        <ErrorMessage name="password" component={Message} />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                </Container>
            )}
        </Formik>
    );
};

export default Basic;


