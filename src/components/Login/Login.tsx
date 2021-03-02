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
import {useDispatch, useSelector} from "react-redux";
import {thunkLogin} from "../../state/auth/thunks";
import {AppRootStateType} from "../../state/store";
import {Redirect} from "react-router-dom";

interface Values {
    email: string,
    password: string,
    rememberMe: boolean
}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


type myCheckboxProps = { label : string } & FieldAttributes<{}>

const MyCheckbox: React.FC<myCheckboxProps> = ({label, ...props}) => {
    const [field] = useField<{}>(props)
    return <FormControlLabel {...field} control={<Checkbox />} label={label} />
}

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (isLoggedIn) return <Redirect to={"/react-todolist"} />

    return <Grid container justify="center">
        <Grid item xs={4}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false
                }}
                validate={values => {
                    const errors: FormikErrorType = {}
                    if (!values.email) errors.email = 'Required'
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                        errors.email = 'Invalid email address'
                    if(values.password.length < 3) {
                        errors.password = 'Too short password'
                    }
                    return errors
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting, resetForm}: FormikHelpers<Values>,
                ) => {
                    setSubmitting(true)
                    dispatch(thunkLogin(values))
                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({handleBlur, errors, touched}) => (
                <Form>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered&nbsp;
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}>here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <Field error={touched.email && !!errors.email} label="Email"
                                   helperText={touched.email && errors.email} name="email"
                                   margin="normal" onBlur={handleBlur} as={TextField}/>
                            <Field error={touched.password && !!errors.password} type="password"
                                   helperText={touched.password && errors.password} label="Password"
                                   margin="normal" onBlur={handleBlur}  name="password" as={TextField}/>
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