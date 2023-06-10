import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CustomButton from "../Inputs/Buttons/CustomButton";
import {Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {
    CHANGE_CONTACT_ROUTE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE,
    MY_GROUPS_ROUTE, PROFILES_ROUTE,
} from "../../../utils/consts";
import {AuthContext} from "../../../Context/AuthContext";

const Header = observer(() => {
    const [Link] = useState([
            {value:LOGIN_ROUTE, title: 'Login'},
        ]
    )

    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const LogOut = event => {
        event.preventDefault()
        user.setIsAuth(false)
        user.setUser(null)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href={user.isAuth ? MAIN_PAGE_ROUTE : LOGIN_ROUTE}>Friendly Book</Navbar.Brand>
                    <Nav className="ml-auto">
                        {
                            user.isAuth ?
                                <>
                                    <Nav.Link href={CHANGE_CONTACT_ROUTE}>{user.user.Login}</Nav.Link>
                                    <Nav.Link href={MY_GROUPS_ROUTE}>Мои группы</Nav.Link>
                                    <Nav.Link href={PROFILES_ROUTE}>Изменение состава группы</Nav.Link>
                                    <CustomButton
                                        className={'ml-4 h-75'}
                                        variant={'outline-light'}
                                        title={'Выйти из аккаунта'}
                                        onClick={LogOut}/>
                                </>
                            :
                                Link.map(propsLink =>
                                    <Nav.Link href={propsLink.value} key={propsLink.value}>{propsLink.title}</Nav.Link>
                                )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
})

export default Header;