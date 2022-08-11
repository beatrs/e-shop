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

const SearchContainer = styled.div`
    display: flex;
    /* border: 1px solid lightgray; */
    /* height: 36px; */
    padding: 5px 15px;
    background-color: rgba(217, 217, 217, 0.3);
    border-radius: 40px;
    height: 2.5em;
    width: 15em;

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

    @media (max-width: 768px) {
        display: none;
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
    border-radius: 50%;
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

const Header = (props) => {
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
    console.log('cart items: ', cart.quantity)

    const goTo = (url) => {
        navigate(url)
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
                        <NavItem><Link to="/" style={linkStyles}>Home</Link></NavItem>
                        <NavItem><Link to="/shop/album" style={linkStyles}>Albums</Link></NavItem>
                        <NavItem><Link to="/shop/merch" style={linkStyles}>Official MD</Link></NavItem>
                        <NavItem><Link to="/shop/kstyle" style={linkStyles}>K-Style</Link></NavItem>
                        <NavItem><Link to="/shop/photo%20book" style={linkStyles}>Photo Books</Link></NavItem>
                    </NavItems>
                    
                    <SearchContainer>
                        <SearchInput type='text' />
                        <SearchIcon className="search--icon"/>
                    </SearchContainer>
                </Mid>
                <Right>
                    {user ?
                    // <NavItem onClick={handleLogout}><Link to="/login" style={linkStyles}>Reset</Link></NavItem> 
                    <NavItem>
                        <ProfileImg src={user.profileImg} />
                        <NavSelect>
                            <Option onClick={()=>goTo("/orders")}>My Orders</Option>
                            <Option value="logout" onClick={handleLogout}>Logout</Option>
                        </NavSelect>
                    </NavItem>
                    :
                    <NavItem><Link to="/login" style={linkStyles}>Sign In</Link></NavItem>  
                    }
                    
                    {/* <NavItem><Link to="/register" style={linkStyles}>Register</Link></NavItem> */}
                    <NavItemShow>
                        <Link to="/cart" style={linkStyles}>
                        <Badge badgeContent={cart && cart.quantity} color="primary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                        </Link>
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