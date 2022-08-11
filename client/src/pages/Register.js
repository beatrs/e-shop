import { useState } from "react"
import styled from "styled-components"
import Newsletter from "../components/Newsletter/Newsletter"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
`
const Title = styled.h1`
    margin-bottom: 25px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 50%;

    @media (max-width: 768px) {
        width: 80%;
    }

`

const Input = styled.input`
    padding: 10px;
    text-transform: capitalize;
    margin-bottom: 15px;
`

const Name = styled.div`
    display: flex;
    justify-content: space-between;

    > Input {
        width: 49%;
    }
`

const Agreement = styled.span`
    margin-bottom: 15px;
`

const Button = styled.button`
    border: none;
    height: 40px;
    cursor: pointer;
`

const Login = styled.span`
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
`

const Link = styled.a`
    cursor: pointer;
    color: #709f70;
`

const Register = () => {
    
    const [isToggled, setIsToggled] = useState(true)

    const navigate = useNavigate()
    const goTo = (url) => {
        navigate(url)
    }
    return (
        <Container>
            <StickyHeader handleToggle={isToggled} />
            <div onClick={()=>setIsToggled(!isToggled)}>
            <Wrapper>
                <Title>Create an account</Title>
                <Form>
                    <Name>
                        <Input placeholder="first name" />
                        <Input placeholder="last name" />
                    </Name>
                    <Input placeholder="email" />
                    <Input placeholder="password" />
                    <Input placeholder="confirm password" />
                    <Agreement>
                        By clicking Create Account, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.
                    </Agreement>
                    <Button>Create Account</Button>
                    
                    <Login>
                        Already have an account?
                        <Link onClick={()=>goTo('/login')}> Sign in here</Link>
                    </Login>
                </Form>
            </Wrapper>
            <Newsletter />
            <Footer />
            </div>
        </Container>
    )
}

export default Register