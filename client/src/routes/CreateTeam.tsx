// Render Prop
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { Formik, ErrorMessage } from 'formik';
import { Form, Message, Header, Container } from 'semantic-ui-react';

const CREATE_TEAM = gql`
    mutation($input: CreateTeamInput!) {
        createTeam(input: $input) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

export const CreateTeam = (props): any => {
    const [createTeam, { loading, error }] = useMutation(CREATE_TEAM);
    const [initialValues, setInitialValues] = useState({
        name: '',
    });
    const onSubmitHandler = async (values, actions) => {
        console.log(values);
        setInitialValues(values);
        const response: any = await createTeam({
            variables: {
                input: values,
            },
        });
        const { ok, errors } = response.data.createTeam;
        if (ok) {
            props.history.push('/');
        } else {
            console.log('Create Team Errors', errors);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {JSON.stringify(error)}</p>;
    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                let errors: any = {};

                const name = values.name;
                if (!name) {
                    errors.name = 'Name is required';
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
                    <Header as="h2">Create Team</Header>
                    <Form error onSubmit={handleSubmit}>
                        <Form.Input
                            type="name"
                            name="name"
                            placeholder="Team Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={!!(errors.name && touched.name)}
                            fluid
                        />
                        <ErrorMessage name="name" component={Message} />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                </Container>
            )}
        </Formik>
    );
};
