import styled from "styled-components"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"

const Container = styled.div``
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

const Link = styled.span`
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
`

const Product = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;

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
`
const Summary = styled.div`
`

const Cart = () => {
    return (
        <Container>
            <StickyHeader />
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                    <Button>Continue shopping</Button>
                    <Links>
                        <Link>Shopping Bag(1)</Link>
                        <Link>Wishlist(0)</Link>
                    </Links>
                    <Button>Checkout now</Button>
                </Top>
                <CartWrapper>
                    <Product>
                        <ProductImage src="https://preview.redd.it/sgz9gseqi9n51.jpg?width=640&crop=smart&auto=webp&s=84dc901d9fac87a59502d83f61191912cb21f9aa" />
                        <ProductInfo>
                            <ProductDetails>
                                <ProductName>Vogue Korea September 2020 Issue feat. Jang Wonyoung X Kim Minju </ProductName>
                                <ProductOptions>Version A</ProductOptions>
                                <ProductPrice>Price ₱1,300.00</ProductPrice>
                            </ProductDetails>
                            <PriceDetails>
                                <Quantity>
                                    <QuantityLbl>Quantity</QuantityLbl>
                                    <QuantityInput type="number" min="1" placeholder="1"/>
                                </Quantity>
                                <Subtotal>₱1,300.00</Subtotal>
                            </PriceDetails>
                        </ProductInfo>
                    </Product>
                </CartWrapper>
                <Bottom>
                    <Summary>Summary</Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart