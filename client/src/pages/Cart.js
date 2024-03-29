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

const CartWrapper = styled.div`
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

const PriceDetails = styled.div`
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

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const user = useSelector((state) => state.user.currentUser)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const updateCart = (e, pId) => {
        const quantity = parseInt(e.target.value)
        console.log(quantity)
        dispatch(
            changeQty({pId, quantity})
        )
    }

    const deleteItem = (pId) => {
        console.log(pId)
        dispatch(
            removeItem(pId)
        )
    }

    const alert = useAlert()

    const handleCheckout = () => {
        if (user && cart && cart.quantity >= 1) {
            let prodList = []
            cart.products.forEach((product) => {
                var {_id, quantity, itemVersion} = product
                prodList.push({
                    _product: _id,
                    quantity: quantity,
                    version: itemVersion
                })
            })
            // console.log(prodList)
            const newOrder = {
                _user: user._id,
                products: prodList,
                totalQty: cart.quantity,
                amount: cart.total
            }
            
            const submitOrder = async() => {
                try {
                    const query = `/orders`
                    const res = await userRequest.post(query, newOrder)
                    if (res.data)
                        navigate('/')
                } catch (err) {
                    console.error(err)
                }
            }
            submitOrder()
            handleClearAll()
        } else {
            if (!user){
                alert.error('Please login to proceed.')
            }
            if (cart.quantity < 1) {
                alert.error('Cart is empty.')
            }
        }
    }

    const handleClearAll = () => {
        try {
            dispatch( resetCart() )
        } catch (err) {
            console.error(err)
        }
    }

    const checkoutBtnStyle = {
        cursor: "pointer",
        height: "40px",
        padding: "10px",
        marginTop: "10px",
        background: "coral",
        border: "none",
        color: "white",
        fontSize: "1.05em",
        fontWeight: "bolder",
        textTransform: "uppercase",
        letterSpacing: "1px",
    }

    const CheckoutBtn = {
        name: "Checkout",
        style: checkoutBtnStyle
    }

    const clrAllBtnStyle = {
        cursor: "pointer",
        marginTop: "10px",
        border: "none",
        height: "40px",
        fontFamily: "'Lato', sans-serif",
        fontWeight: "600",
        textTransform: "uppercase",
    }

    const ClrAllBtn = {
        name: "Empty Cart",
        style: clrAllBtnStyle
    }

    const [isToggled, setIsToggled] = useState(true)
    return (
        <Container>
            <StickyHeader handleToggle={isToggled} />
            <div onClick={()=>setIsToggled(!isToggled)}>
                <Wrapper>
                    <Title>Your Cart</Title>
                    <Top>
                        <Button onClick={()=>navigate('/shop')}>Continue shopping</Button>
                        <Links>
                            <LinkItem>Shopping Bag({cart.quantity})</LinkItem>
                            <LinkItem onClick={()=>navigate('/wish')}>Wishlist</LinkItem>
                        </Links>
                        <Button>Checkout now</Button>
                    </Top>
                    <CartWrapper>
                        {
                        cart.quantity > 0 
                        ? cart.products.map((item, index)=>(                    
                        <Product key={item._id + item.itemVersion}>
                            <ProductImage src={item.img} alt={item.imgAlt} />
                            <ProductInfo>
                                <ProductDetails>
                                    <ProductName>{item.title} </ProductName>
                                    <ProductOptions>{item.itemVersion}</ProductOptions>
                                    <ProductPrice>Price ₱ {FormatNumber.formatPrice(item.price)}</ProductPrice>
                                </ProductDetails>
                                <PriceDetails>
                                    <Quantity>
                                        <QuantityLbl>Quantity</QuantityLbl>
                                        <QuantityInput type="number" min="1" value={item.quantity} onChange={(e)=>updateCart(e, item._id)} />
                                    </Quantity>
                                    <Subtotal>₱ {FormatNumber.formatPrice(item.price * item.quantity)}</Subtotal>
                                    <ClrButton onClick={()=>deleteItem(index)}>&times;</ClrButton>
                                </PriceDetails>
                            </ProductInfo>
                        </Product>
                        ))
                        :
                        <EmptyLbl>Your cart is currently empty. <Link to ="/shop">Start shopping</Link></EmptyLbl>
                        }
                    </CartWrapper>
                    <Bottom>
                        <Summary>
                            <SummaryLbl>Subtotal</SummaryLbl>
                            <SummaryTotal>₱ {FormatNumber.formatPrice(cart.total)}</SummaryTotal>
                        </Summary>
                        {/* <CheckoutBtn onClick={handleCheckout}>Checkout</CheckoutBtn> */}
                        <Modal 
                            button={CheckoutBtn}
                            handleConfirm={handleCheckout}
                            content={{
                                title: "Checkout items",
                                body: "Are you sure? Would you like to proceed with your transactions?"
                            }}
                        />
                        <Modal 
                            button={ClrAllBtn}
                            handleConfirm={handleClearAll}
                            content={{
                                title: "Are you sure?",
                                body: "Would you like to reset your cart? This process cannot be undone."
                            }}
                        />
                    </Bottom>
                </Wrapper>
                <Footer />
            </div>
        </Container>
    )
}

export default Cart