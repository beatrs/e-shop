import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"
import Newsletter from "../components/Newsletter/Newsletter"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

import FormatNumber from "../services/general"

import Showdown from "showdown"
import parse from 'html-react-parser';
import { genRequest } from "../reqMethods"

const Container = styled.div`
`

const Wrapper = styled.div`
    width: 80vw;
    display: flex;
    align-items: center;
    margin: auto;
    padding: 20px;

    @media screen and (max-width: 810px) {
        flex-direction: column;
    }
`

const ImgContainer = styled.div`
    flex: 6;
    margin-right: 20px;
`
const Image = styled.img`
    width: 480px;

    @media screen and (max-width: 810px) {
        width: 100%;
    }
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

const CartQty = styled.div`
    flex: 3;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 10px;
`

const CartCount = styled.input`
    width: 20px;
    font-size: 18px;
    text-align: center;
    border: none;
    background-color: transparent;
    color: white;

    /* remove arrow */
    -webkit-appearance: none;
    -moz-appearance: textfield;

    &:focus {
        outline: none;
    }
`
const CartButton = styled.button`
    flex: 7;
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
        const apiQuery = `/products/${itemId}`
        const getProduct = async () => {
            try {
                const res = await genRequest.get(apiQuery)
                console.log(res)
                setItem(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getProduct()
    }, [itemId]) 

    const [quantity, setQuantity] = useState(1)

    const handleQty = (val) => {
        setQuantity(prevQty => {
            const newVal = prevQty + val
            if (newVal >= 0 && newVal <= 10) {
                return newVal
            } 
            return prevQty
        })
    }

    const [itemVersion, setItemVersion] = useState()
    useEffect( ()=> {
        if (item && !itemVersion) {
            setItemVersion(item.versions[0])
        }
    }, [item])

    const dispatch = useDispatch()
    const updateCart = () => {
        console.log(itemVersion)
        dispatch(
            addProduct({
                ...item, quantity, itemVersion
            }) 
        )
    }

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

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
                    <Price>₱{ FormatNumber.formatPrice(item.price) }</Price>
                    <Filter>
                        <FilterText>Version</FilterText>
                        <Select onChange={(e)=>setItemVersion(e.target.value)} >
                            {item.versions.map(version => (
                                <Option key={version} value={version}>{version}</Option>
                            ))}
                        </Select>
                    </Filter>
                    <Status>In stock</Status>
                    <CartWrapper>
                        <CartQty>
                            <FontAwesomeIcon icon={faMinus} className="icon" onClick={()=>handleQty(-1)} />
                            <CartCount type="number" placeholder="1" min={0} value={quantity} readOnly />
                            <FontAwesomeIcon icon={faPlus} className="icon" onClick={()=>handleQty(1)} />
                        </CartQty>
                        <CartButton onClick={updateCart}>Add To Cart</CartButton>
                    </CartWrapper>
                    <Description>
                        {parse(converter.makeHtml(item.desc))}
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