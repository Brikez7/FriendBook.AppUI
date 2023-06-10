import React, {useContext, useState} from 'react';
import InputText from "../Components/UI/Inputs/Inputs/InputText";
import CustomButton from "../Components/UI/Inputs/Buttons/CustomButton";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Card, Container, Form, Nav, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MY_GROUPS_ROUTE, MAIN_PAGE_ROUTE} from "../utils/consts";
import {authorisation, registration} from "../API/IdentityServer";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";
import {AuthContext} from "../Context/AuthContext";

const Login = observer(() => {
    const navigator = useNavigate();
    const location = useLocation()
    const {user} = useContext(AuthContext)
    const [accountDTO,setAccountDTO] = useState({
        login:'',
        password:'',
        repeatPassword: ''
    })
    const isLogin = location.pathname === LOGIN_ROUTE;

    const click = async (e) => {
        e.preventDefault()
        let userResponse;

        if (isLogin) {
            userResponse = await authorisation(accountDTO.login, accountDTO.password)
        } else {
            if (accountDTO.password === accountDTO.repeatPassword) {
                userResponse = await registration(accountDTO.login, accountDTO.password)
            } else {
                return;

            }
        }

        if (userResponse.message !== null) {
            alert(userResponse.message)
            return;
        }
        const userDec = jwtDecode(userResponse.data)
        user.setUser(userDec)
        user.setIsAuth(true)
        console.log(MAIN_PAGE_ROUTE)
        navigator(MAIN_PAGE_ROUTE)
    }


    return (
    <Container
        className="d-flex justify-content-center align-items-center"

        style={{height: window.innerHeight - 54}}
    >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
            <Form className="d-flex flex-column">
                <InputText
                    className="mt-3"
                    placeholder="Введите ваш логин..."
                    value={accountDTO.login}
                    onChange={e => setAccountDTO({...accountDTO,login: e.target.value})}
                />
                <InputText
                    className="mt-3"
                    placeholder="Введите ваш пароль..."
                    value={accountDTO.password}
                    onChange={e => setAccountDTO({...accountDTO,password: e.target.value})}
                    type="password"
                />
                {
                    !isLogin
                    ? <InputText
                    className="mt-3"
                    placeholder="Повторите ваш пароль..."
                    value={accountDTO.repeatPassword}
                    onChange={e => setAccountDTO({...accountDTO,repeatPassword: e.target.value})}
                    type="password"
                    />
                    : ''
                }
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    {isLogin ?
                        <div>
                            Нет аккаунта?
                            <Nav>
                                <Link className={'p-0 mb-2 nav-link'} to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                            </Nav>
                        </div>
                        :
                        <div>
                            Есть аккаунт?
                            <Nav>
                                <Link className={'nav-link p-0 mb-2 '} to={LOGIN_ROUTE}>Войдите!</Link>
                            </Nav>
                        </div>
                    }
                </Row>
                <CustomButton
                    variant={"outline-success"}
                    title={isLogin ?'Войти' : 'Зарегистрироваться'}
                    onClick = {event => click(event)}
                >
                </CustomButton>
            </Form>
        </Card>
    </Container>
    )
})

export default Login;