import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import logo from '../../assets/logo512.png'
import "./Header.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"

const Container = styled.div`
    height: 120px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 100%;
    margin: auto;
`

//* left side
const Left = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Logo = styled.div`
    cursor: pointer;
    display: flex;
    height: 100%;
    width: 100%;
    color: black;
    text-decoration: none;
`
const LogoText = styled.h1`
    font-family: 'Archivo', sans-serif;
    /* font-weight: bold; */
    font-size: 1.5em;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 500;
    align-self: center;
    background: #8E7DBE;
    background: linear-gradient(to bottom left, #8E7DBE 0%, #D88C9A 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const LogoImg = styled.img`
    align-self: flex-start;
    height: 100%;
`


// * center

const Mid = styled.div`
    width: 60%;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
`
const SearchContainer = styled.div`
    display: flex;
    /* border: 1px solid lightgray; */
    /* height: 36px; */
    padding: 5px 15px;
    background-color: rgba(217, 217, 217, 0.3);
    border-radius: 40px;
    height: 2.5em;
    width: 15em;

    @media (max-width: 768px) {
        display: none;
    }
`

const SearchInput = styled.input`
    border: none;
    color: gray;
    background-color: transparent;
    width: 85%;

    &:focus {
        outline: none;
    }
`


// * right

const Right = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`

const NavItem = styled.a`
    cursor: pointer;
    /* margin-right: 20px; */
    font-family: 'Hind', sans-serif;
    font-weight: 400;
    border: none;
    background: none;

    @media (max-width: 768px) {
        display: none;
    }
`

const Menu = styled.div`
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`

const Header = () => {
    const linkStyles = {
        color: "black",
        textDecoration: "none",
        textTransform: "uppercase"
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const user = useSelector((state) => state.user.currentUser)

    const handleLogout = () => {
        dispatch({
            type: "RESET"
        })
        navigate("/")
    }
    console.log('cart items: ',cart.quantity)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/" className="Logo">
                        <LogoImg src={logo} alt='logo image'/>
                        <LogoText>Wiz</LogoText>
                    </Link>
                </Left>
                <Mid>
                    <NavItem><Link to="/" style={linkStyles}>Home</Link></NavItem>
                    <NavItem><Link to="/shop/album" style={linkStyles}>Albums</Link></NavItem>
                    <NavItem><Link to="/" style={linkStyles}>Official MD</Link></NavItem>
                    <NavItem><Link to="/" style={linkStyles}>K-Style</Link></NavItem>
                    <NavItem><Link to="/" style={linkStyles}>Events</Link></NavItem>
                    <SearchContainer>
                        <SearchInput type='text' />
                        <SearchIcon className="search--icon"/>
                    </SearchContainer>
                </Mid>
                <Right>
                    {user ?
                    <NavItem onClick={handleLogout}><Link to="/login" style={linkStyles}>Reset</Link></NavItem>  
                    :
                    <NavItem><Link to="/login" style={linkStyles}>Sign In</Link></NavItem>  
                    }
                    
                    {/* <NavItem><Link to="/register" style={linkStyles}>Register</Link></NavItem> */}
                    <NavItem>
                        <Link to="/cart" style={linkStyles}>
                        <Badge badgeContent={cart && cart.quantity} color="primary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                        </Link>
                    </NavItem>
                    <Menu>
                        <FontAwesomeIcon icon={ faBars } />
                    </Menu>
                </Right>
            </Wrapper>
            
        </Container>
    )
}

export default Header