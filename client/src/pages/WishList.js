import { useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"
import { BsCartCheckFill as ShopIcon } from "react-icons/bs"

import { Link, useNavigate } from "react-router-dom"
import { FormatNumber } from "../services/general"
import { userRequest } from "../reqMethods"

import Modal from "../components/Shared/Modal"
import { useAlert } from "react-alert"
import { useEffect } from "react"

const Container = styled.div`
`
const Wrapper = styled.div`
    padding: 30px;
    width: 80vw;
    min-height: 70vh;
    margin: auto;

    @media screen and (max-width: 810px) {
        width: 90vw;
    }
`
const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Links = styled.div`
    display: flex;
`

const LinkItem = styled.span`
    cursor: pointer;
    text-decoration: underline;
    color: #0d6a43;
    margin: 10px;
`

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
`

const WishlistWrapper = styled.div`
    border: 1px solid lightgray;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: 200px;
    
`

const EmptyLbl = styled.div`
    text-align: center;
`

const Product = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 768px ) {
        align-items: flex-start;
    }
`
const ProductInfo = styled.div`
    width: calc(100% - 120px);
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px ) {
        flex-direction: column;
    }

    @media screen and (max-width: 479px ) {
        width: calc(100% - 75px);
    }
`

const ProductImage = styled.img`
    /* height: 240px; */
    width: 120px;
    margin-right: 30px;

    @media screen and (max-width: 479px ) {
        width: 75px;
    }
`

const ProductDetails = styled.div`
    margin-right: auto;
    
`

const ProductName = styled.div`
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'Kanit', sans-serif;
    letter-spacing: 1px;
    margin-bottom: 10px;
`

const ProductOptions = styled.div`
    margin-bottom: 10px;
    color: gray;
    font-size: 0.85em;
`
const ProductPrice = styled.div`
    margin-bottom: 10px;
    color: gray;
    font-size: 0.85em;
`

const Options = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 479px ) {
        margin-top: 10px;
        width: 100%;
    }
`

const ShopButton = styled.button`
    cursor: pointer;
    padding: 12px 40px;
    cursor: pointer;
    display: flex;
    gap: 8px;
    font-size: 1.025em;
    border: none;
    border-radius: 5px;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
`

const ClrButton = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    margin-left: 10px;
`

const WishList = () => {
    const user = useSelector((state) => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) {
            console.log(user)
            const getWishlist = async () => {
                try {
                    const query = `/wish/${user._id}`
                    const res = await userRequest.get(query)
                    // console.log(res)
                    if (res.data )
                        setWishlist(res.data[0])
                } catch (err) {
                    console.log(err)
                }
            }
            getWishlist()
        }
    }, [user])

    const deleteItem = async(pId) => {
        try {
            const query = `/wish/${user._id}/${pId}`
            const res = await userRequest.delete(query)

            if (res)
                window.location.reload()
        } catch (err) {
            alert.error("Something went wrong. Please try again.")
        }
    }

    const alert = useAlert()

    const [isToggled, setIsToggled] = useState(true)
    return (
        <Container>
            <StickyHeader handleToggle={isToggled} />
            <div onClick={()=>setIsToggled(!isToggled)}>
                <Wrapper>
                    <Title>Your Wishlist</Title>
                    <Top>
                        <Button onClick={()=>navigate('/shop')}>Continue shopping</Button>
                        <Links>
                            <LinkItem onClick={()=>navigate('/cart')}>Shopping Bag({cart.quantity})</LinkItem>
                            <LinkItem>Wishlist({wishlist.products ? wishlist.products.length : 0})</LinkItem>
                        </Links>
                        <Button onClick={()=>navigate('/shop')}>Continue shopping</Button>
                    </Top>
                    <WishlistWrapper>
                        {wishlist && 
                        wishlist.products ? wishlist.products.map((item)=>(                    
                        <Product key={item._product._id}>
                            <ProductImage src={item._product.img} alt={item._product.imgAlt} />
                            <ProductInfo>
                                <ProductDetails>
                                    <ProductName>{item._product.title} </ProductName>
                                    <ProductOptions>{item._product.versions[0] || ''}</ProductOptions>
                                    <ProductPrice>Price ₱ {FormatNumber.formatPrice(item._product.price)}</ProductPrice>
                                </ProductDetails>
                                <Options>
                                    <ShopButton onClick={()=>navigate(`/product/${item._product._id}`)} >
                                        <ShopIcon />
                                        <span>Shop</span>
                                    </ShopButton>
                                    <ClrButton onClick={()=>deleteItem(item._product._id)}>&times;</ClrButton>
                                </Options>
                            </ProductInfo>
                        </Product>
                        ))
                        :
                        <EmptyLbl>Your wishlist is currently empty. <Link to ="/shop">Start shopping</Link></EmptyLbl>
                        }
                    </WishlistWrapper>
                </Wrapper>
                <Footer />
            </div>
        </Container>
    )
}

export default WishList