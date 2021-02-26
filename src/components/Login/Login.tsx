import React from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {Field, FieldAttributes, Form, Formik, FormikHelpers, useField} from "formik"
import {CheckBox} from "@material-ui/icons";

interface Values {
    email: string,
    password: string,
    rememberMe: boolean
}

type myCheckboxProps = { label : string } & FieldAttributes<{}>

const MyCheckbox: React.FC<myCheckboxProps> = ({label, ...props}) => {
    const [field] = useField<{}>(props)
    return <FormControlLabel {...field} control={<Checkbox />} label={label} />
}

export const Login = () => {
    return <Grid container justify="center">
        <Grid item xs={4}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    alert(JSON.stringify(values))
                    setSubmitting(false)
                }}
            >
                {({values, isSubmitting, errors, touched}) => (
                <Form>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}>here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <Field label="Email" margin="normal" name="email" as={TextField}/>
                            <Field type="password" label="Password" margin="normal" name="password" as={TextField}/>
                            <Field label={'Remember me'} name={"rememberMe"} as={MyCheckbox}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </Form>
                )}
            </Formik>
        </Grid>
    </Grid>
};