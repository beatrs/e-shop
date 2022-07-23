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

    @media only screen and (max-width: 1279px)  {
        width: 90%;
    }
`

const NavItems = styled.div`
    display: flex;
    gap: 20px;

`

const NavItem = styled.a`
    cursor: pointer;
    /* margin-right: 20px; */
    font-family: 'Hind', sans-serif;
    font-weight: 400;
    border: none;
    background: none;
    display: flex;
    position: relative;

`




const NavSelect = styled.select`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
`

const Option = styled.option`
    cursor: pointer;
`

const MinHeader = (props) => {
    const linkStyles = {
        color: "black",
        textDecoration: "none",
        textTransform: "uppercase",
        alignSelf: "center"
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
    
    return (
        <Container>
            <Wrapper>
                <NavItems>
                    <NavItem><Link to="/" style={linkStyles}>Home</Link></NavItem>
                    <NavItem><Link to="/shop/album" style={linkStyles}>Albums</Link></NavItem>
                    <NavItem><Link to="/shop/merch" style={linkStyles}>Official MD</Link></NavItem>
                    <NavItem><Link to="/" style={linkStyles}>K-Style</Link></NavItem>
                    <NavItem><Link to="/" style={linkStyles}>Events</Link></NavItem>
                </NavItems>
            </Wrapper>
            
        </Container>
    )
}

export default MinHeader