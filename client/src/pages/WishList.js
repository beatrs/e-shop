import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"

import { Link, useNavigate } from "react-router-dom"
import { FormatNumber } from "../services/general"
import { changeQty, removeItem, resetCart } from "../redux/cartRedux"
import { userRequest } from "../reqMethods"

import Modal from "../components/Shared/Modal"
import { useAlert } from "react-alert"
import { useEffect } from "react"

const Container = styled.div`
`
const Wrapper = styled.div`
    padding: 30px;
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

const Quantity = styled.div`
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    padding: 5px 10px;
    width: 115px;
`
const QuantityLbl = styled.small`
    color: gray;
`

const QuantityInput = styled.input`
    width: 80%;
    margin: auto;
    margin-top: 8px;
    border: none;
`

const Subtotal = styled.div``

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
`
const Summary = styled.div`
    display: flex;
    justify-content: space-between;
`
const SummaryLbl = styled.div`
`
const SummaryTotal = styled.div`
    font-size: 2em;
    font-weight: bold;
`


const ClrButton = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    margin-left: 10px;
`

const ClrAllBtn = styled.button`
    cursor: pointer;
    margin-top: 10px;
    border: none;
    height: 40px;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
`

const WishList = () => {
    const user = useSelector((state) => state.user.currentUser)
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            console.log(user)
            const getWishlist = async () => {
                try {
                    const query = `/wish/${user._id}`
                    const res = await userRequest.get(query)
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
                            <LinkItem>Shopping Bag(1)</LinkItem>
                            <LinkItem>Wishlist(0)</LinkItem>
                        </Links>
                        <Button>Checkout now</Button>
                    </Top>
                    <WishlistWrapper>
                        {wishlist ? 
                        wishlist.products && wishlist.products.map((item)=>(                    
                        <Product key={item._product._id}>
                            <ProductImage src={item._product.img} alt={item._product.imgAlt} />
                            <ProductInfo>
                                <ProductDetails>
                                    <ProductName>{item._product.title} </ProductName>
                                    <ProductOptions>{item._product.versions[0] || ''}</ProductOptions>
                                    <ProductPrice>Price ₱ {FormatNumber.formatPrice(item._product.price)}</ProductPrice>
                                </ProductDetails>
                                <Options>
                                    <Button onClick={()=>navigate(`/product/${item._product._id}`)}>Shop</Button>
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