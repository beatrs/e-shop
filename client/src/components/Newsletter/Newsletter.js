
import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    background-color: #ff7f502e;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media only screen and (max-width: 768px) {
        padding: 10px;
    }

`
const Title = styled.h1`
    margin-bottom: 15px;
    font-size: 4rem;
    letter-spacing: 1px;

    @media only screen and (max-width: 768px) {
        font-size: 2rem;
    }
`
const Description = styled.p`
    margin-bottom: 15px;
    font-size: 1.5rem;

    @media only screen and (max-width: 768px) {
        font-size: 1.2rem;
    }
`
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 768px) {
        width: 70%;
    }
    @media only screen and (max-width: 479px) {
        width: 90%;
    }
`
const Input = styled.input`
    width: 80%;
    height: 100%;
    padding: 10px;
    font-size: 1rem;
    color: gray;
    border: 1px solid lightgray;

    @media only screen and (max-width: 479px) {
        width: 75%;
    }
`
const Button = styled.button`
    width: 10%;
    height: 100%;
    padding: 10px;
    margin-left: 5px;
    cursor: pointer;
    background-color: #b32323b0;
    color: white;
    border: none;

    @media only screen and (max-width: 479px) {
        width: 15%;
    }
`

const Newsletter = () => {
    const title ="Newsletter"
    const desc = "Never miss the latest sales and kpop pre-orders for groups you love!"
    return (
        <Container>
            <Title>{ title }</Title>
            <Description>{ desc }</Description>
            <InputContainer>
                <Input placeholder="Email Address" />
                <Button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter