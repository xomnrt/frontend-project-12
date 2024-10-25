import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthProvider.jsx';
import { useContext } from 'react';


const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Необходимо ввести имя пользователя';
    } else
        if (6 < values.username.length < 20) {
            errors.username = 'Имя пользователя должно быть от 3 до 20 символов';
        }

    if (!values.password) {
        errors.password = 'Необходимо ввести пароль';
    } else if (values.password.length < 6) {
        errors.password = 'Пароль должен содержать от 6 символов';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Повторите пароль';
    }
    else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают';
    }

    return errors;
};


const RegistrationForm = () => {

    const authContext = useContext(AuthContext);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        validate,
        onSubmit: async (values) => {
            console.log(JSON.stringify(values, null, 2));
            formik.resetForm();
            try {
                await authContext.sendSignupData(values.username, values.password);
                formik.resetForm();
                navigate("/");
            } catch (e) {
                if (e instanceof AxiosError && e.status === 409) {
                    formik.setErrors({
                        username: "Имя пользователя уже занято"
                    });
                } else {
                    console.log(e)
                }

            }

        },
    });
    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <Card className="shadow-sm">
                        <Card.Body className="mx-auto row p-5">
                            <Form onSubmit={formik.handleSubmit}>
                                <Stack gap={3} >
                                    <h1 className="text-center mb-4">Зарегистрироваться</h1>
                                    <Form.Group className="mb-1" controlId="formUsername">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            name="username"
                                            type="text"
                                            placeholder="Имя пользователя"
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                            className={formik.errors.username ? "border border-danger" : ""}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="text-danger">{formik.errors.username}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <Form.Group className="mb-1" controlId="formPassword">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            placeholder="Пароль"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />

                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-danger">{formik.errors.password}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Повторите пароль"
                                            onChange={formik.handleChange}
                                            value={formik.values.confirmPassword}
                                        />

                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="text-danger">{formik.errors.confirmPassword}</div>
                                        ) : <div></div>}
                                    </Form.Group>

                                    <div className="mx-auto mb-3 mt-1">
                                        <Button variant="success" type="submit" className="btn-lg">Зарегистрироваться</Button>
                                    </div>
                                </Stack>

                            </Form>
                        </Card.Body>

                    </Card>
                </div>
            </Row>
        </Container>
    );
}

export default RegistrationForm;