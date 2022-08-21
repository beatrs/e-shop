import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import logo from '../../assets/logos/xoxo-logos_transparent.png'
import "./Header.scss"


import { GrMenu as MenuIcon } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

const Container = styled.div`
    height: 120px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    @media screen and (max-width: 1079px) {
        box-shadow: none;
    }
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

//* left side
const Left = styled.div`
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 768px) {
        flex: 3;
    }
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
    /* align-self: flex-start; */
    height: 100%;
    align-self: center;
    width: 280px;
    object-fit: cover;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
        padding: 10px 0px 0px 50px;
    }
`


// * center

const Mid = styled.div`
    width: 65%;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;

    @media only screen and (max-width: 768px) {
        /* display: none; */
        flex: 0;
    }
`

const NavItems = styled.div`
    display: flex;
    gap: 20px;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`

const SearchContainer = styled.form`
    display: flex;
    /* border: 1px solid lightgray; */
    /* height: 36px; */
    padding: 5px 15px;
    background-color: rgba(217, 217, 217, 0.3);
    border-radius: 40px;
    height: 2.5em;
    width: 22em;

    @media only screen and (max-width: 1439px) {
        width: 15em;
    }

    @media only screen and (max-width: 1079px) {
        /* width: 80%; */
        display: none;
    }

    /* @media only screen and (max-width: 539px) {
        display: none;
    } */
`

const SearchInput = styled.input`
    flex: 1;
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

    /* @media (max-width: 479px) {
        width: 40%;
    } */
    @media only screen and (max-width: 768px) {
        flex: 1;
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
    
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    align-self: center;
    
    -webkit-transition: color 0.5s;
    transition: color 0.5s;

    @media (max-width: 768px) {
        display: none;
    }

    &:hover {
        color: #539E8A;
    }
`

const NavItemShow = styled.a`
    cursor: pointer;
    /* margin-right: 20px; */
    font-family: 'Hind', sans-serif;
    font-weight: 400;
    border: none;
    background: none;
    display: flex;
    position: relative;
    
    align-self: center;
`

const Menu = styled.div`
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`

const ProfileImg = styled.img`
    width: 2.5em;
    height: 2.5em;
    border: 1px solid lightgray;
    border-radius: 50%;
`

const NavSelect = styled.div`
    /* cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; */
    position: absolute;
    top: 3em;
`

const OptionList = styled.ul`
    width: 8em;
    margin: 0;
    padding: 0;
    /* padding-left: 1em; */
    background: #ffffff;
    border: 2px solid #e5e5e5;
    font-size: 0.95em;
    font-weight: 500;
    box-sizing: border-box;
    color: gray;
    text-transform: capitalize;
    /* padding-bottom: 0.8em; */

    /* &:first-child {
        padding-top: 0.8em;
    } */
`

const Option = styled.li`
    /* cursor: pointer; */
    list-style: none;
    /* margin-bottom: 0.8em; */
    padding: 10px;

    &:hover {
        background-color: rgb(240, 248, 255);
    }
`

const Header = (props) => {
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
    // console.log('cart items: ', cart.quantity)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
        console.log(isDropdownOpen)
    }

    const goTo = (url) => {
        setIsDropdownOpen(false)
        navigate(url)
    }
    const [searchTerm, setSearchTerm] = useState()
    const handleSearch = async(e) => {
        e.preventDefault()
        try {
            console.log(searchTerm)
            goTo(`/shop/find/${searchTerm}`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <MenuIcon className="drawer" onClick={()=>props.handleMenuClick()} />
                    <LogoImg src={logo} alt='logo image' onClick={()=>goTo('/')}/>
                </Left>
                <Mid>
                    <NavItems>
                        <NavItem onClick={()=>goTo('/')}>Home</NavItem>
                        <NavItem onClick={()=>goTo('/shop/album')}>Albums</NavItem>
                        <NavItem onClick={()=>goTo('/shop/merch')}>Official MD</NavItem>
                        <NavItem onClick={()=>goTo('/shop/kstyle')}>K-Style</NavItem>
                        <NavItem onClick={()=>goTo('/shop/photo%20book')}>Photo Books</NavItem>
                    </NavItems>
                    
                    <SearchContainer onSubmit={handleSearch}>
                        <SearchInput type='text' onChange={(e)=>setSearchTerm(e.target.value)} />
                        <SearchIcon className="search--icon" onClick={handleSearch}/>
                    </SearchContainer>
                </Mid>
                <Right>
                    {user ?
                    // <NavItem onClick={handleLogout}><Link to="/login" style={linkStyles}>Reset</Link></NavItem> 
                    <NavItem onClick={toggleDropdown} >
                        <ProfileImg src={user.profileImg}/>
                        {isDropdownOpen &&
                        <NavSelect >
                            <OptionList >
                                <Option onClick={()=>window.location.assign("/orders")}>My Orders</Option>
                                <Option onClick={()=>goTo("/wish")}>My Wishlist</Option>
                                <Option value="logout" onClick={handleLogout}>Logout</Option>
                            </OptionList>
                        </NavSelect>
                        }
                    </NavItem>
                    :
                    <NavItem onClick={()=>goTo('/login')}>Sign In</NavItem>  
                    }
                    
                    {/* <NavItem><Link to="/register" style={linkStyles}>Register</Link></NavItem> */}
                    <NavItemShow onClick={()=>goTo('/cart')}>
                        <Badge badgeContent={cart && cart.quantity} color="primary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </NavItemShow>
                    {/* <Menu>
                        <FontAwesomeIcon icon={ faBars } />
                    </Menu> */}
                </Right>
            </Wrapper>
            
        </Container>
    )
}

export default Header