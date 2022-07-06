import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import logo from '../../assets/logo512.png'
import "./Header.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    height: 120px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    position: relative;
`
//* left side
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.div`
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
    font-size: 0.8em;
    margin-right: 15px;

    @media (max-width: 768px) {
        display: none;
    }
`

const SearchContainer = styled.div`
    display: flex;
    border: 1px solid lightgray;
    height: 36px;
    padding: 5px 10px;

    @media (max-width: 768px) {
        display: none;
    }
`

const SearchInput = styled.input`
    border: none;
    color: gray;

    &:focus {
        outline: none;
    }
`

// * center

const Mid = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
`

const Logo = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    height: 100%;
    cursor: pointer;

    @media (max-width: 768px) {
        height: auto-fit;
    }
`

const LogoText = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 1.5em;
    margin: auto;
    text-transform: uppercase;
`

const LogoImg = styled.img`
    align-self: flex-start;
    height: 100%;
`

// * right

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const NavItem = styled.div`
    cursor: pointer;
    margin-left: 20px;

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
        textDecoration: "none"
    }
    return (
        <Container>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <SearchInput type='text' />
                    <SearchIcon />
                </SearchContainer>
            </Left>
            <Mid>
                <Link to="/" className="Logo">
                    <LogoImg src={logo} alt='logo image'/>
                    <LogoText>Kpop Wiz</LogoText>
                </Link>
            </Mid>
            <Right>
                <NavItem><Link to="/login" style={linkStyles}>Sign In</Link></NavItem>
                <NavItem><Link to="/register" style={linkStyles}>Register</Link></NavItem>
                <NavItem>
                    <Link to="/cart" style={linkStyles}>
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                    </Link>
                </NavItem>
                <Menu>
                    <FontAwesomeIcon icon={ faBars } />
                </Menu>
            </Right>
        </Container>
    )
}

export default Header