import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"
import Newsletter from "../components/Newsletter/Newsletter"

const Container = styled.div`
`

const Wrapper = styled.div`
    width: 80vw;
    display: flex;
    align-items: center;
    margin: auto;
    padding: 20px;
`

const ImgContainer = styled.div`
    flex: 6;
    margin-right: 20px;
`
const Image = styled.img`
    width: 480px;
`

const InfoContainer = styled.div`
    flex: 4;
`
const Title = styled.h1`
    font-size: 26px;
    margin-bottom: 20px;
`
const Price = styled.p`
    font-size: 40px;
    margin-bottom: 20px;
`

const Description = styled.p`
    margin-bottom: 20px;
`
const Filter = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const FilterText = styled.p`
    flex: 2;
`
const Select = styled.select`
    flex: 8;
    height: 40px;
    border: none;
    padding: 10px;
    background-color: white;
`
const Option = styled.option`
`

const Status = styled.p`
    font-size: 14px;
    color: gray;
    margin-bottom: 20px;
`
const CartWrapper = styled.div`
    background-color: black;
    height: 55px;
    margin-bottom: 20px;
    display: flex;
`
const CartCount = styled.input`
    flex: 2;
    width: 20px;
    font-size: 18px;
    text-align: center;
    border: none;
    background-color: transparent;
    color: white;
`
const CartButton = styled.button`
    flex: 8;
    border: none;
    background-color: transparent;
    color: white;
    font-weight: bold;
    cursor: pointer; 
`

const Product = () => {
    const [item, setItem] = useState()
    const location = useLocation()
    console.log(location)
    const itemId = location.pathname.split("/")[2]
    console.log(itemId)
    useEffect(() => {
        const apiQuery = `http://localhost:5000/api/products/${itemId}`
        const getProduct = async () => {
            try {
                const res = await axios.get(apiQuery)
                console.log(res)
                setItem(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getProduct()
    }, [itemId]) 

    const formatPrice = (price) => {
        var parts = (+price).toFixed(2).split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (+parts[1] ? "." + parts[1] : "")
    }
    return (
        <Container>
            <StickyHeader navFirst={true} />
            {item && 
            <Wrapper>
                <ImgContainer>
                    <Image src={item.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{ item.title }</Title>
                    <Price>₱{ formatPrice(item.price) }</Price>
                    <Filter>
                        <FilterText>Version</FilterText>
                        <Select>
                            {item.versions.map(version => (
                                <Option>{version}</Option>
                            ))}
                        </Select>
                    </Filter>
                    <Status>In stock</Status>
                    <CartWrapper>
                        <CartCount type="number" placeholder="1" min={1} />
                        <CartButton>Add To Cart</CartButton>
                    </CartWrapper>
                    <Description>
                        {item.desc}
                    </Description>
                </InfoContainer>
            </Wrapper>
            }
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product