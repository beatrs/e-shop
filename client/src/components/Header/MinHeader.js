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
    /* height: 120px; */
    background-color: white;
    display: none;

    @media screen and (max-width: 1079px) {
        position: relative;
        z-index: -1;
        display: flex;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
`

const Wrapper = styled.div`
    display: flex;
    width: 80%;
    height: 100%;
    margin: auto;
    padding: 8px;

    @media only screen and (max-width: 1279px)  {
        width: 90%;
    }
`

const NavItems = styled.div`
    display: flex;
    gap: 20px;
    width: 80%;
    justify-content: space-around;
    margin: auto;
    align-items: center;

    @media screen and (max-width: 479px) {
        font-size: 0.9em;
        width: 100%;
    }
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
    text-transform: uppercase;

`

const MinHeader = (props) => {
    const navigate = useNavigate()
    
    return (
        <Container>
            <Wrapper>
                <NavItems>
                    <NavItem onClick={()=>navigate("/")}>Home</NavItem>
                    <NavItem onClick={()=>navigate("/shop/album")}>Albums</NavItem>
                    <NavItem onClick={()=>navigate("/shop/merch")}>Official MD</NavItem>
                    <NavItem onClick={()=>navigate("/")}>K-Style</NavItem>
                    <NavItem onClick={()=>navigate("/")}>Events</NavItem>
                </NavItems>
            </Wrapper>
            
        </Container>
    )
}

export default MinHeader