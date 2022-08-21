import styled from "styled-components"
import Newsletter from "../components/Newsletter/Newsletter"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import { login } from "../redux/apiCalls"
import { useNavigate } from "react-router-dom"
const Container = styled.div`
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    /* width: 80vw; */
    min-height: 70vh;
    margin: auto;

    @media screen and (max-width: 810px) {
        width: 95vw;
        padding: 10px;
    }
`
const Title = styled.h1`
    margin-bottom: 25px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 40%;

    
    @media screen and (max-width: 1079px) {
        width: 70%;
    }
    @media screen and (max-width: 479px) {
        width: 90%;
    }

`

const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
`

const Name = styled.div`
    display: flex;
    justify-content: space-between;

    > Input {
        width: 49%;
    }
`

const Error = styled.span`
    color: red;
    text-align: center;
`

const Register = styled.span`
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
`

const Link = styled.span`
    cursor: pointer;
    color: #709f70;
`

const Button = styled.button`
    border: none;
    height: 40px;
    cursor: pointer;
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { isFetching, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const handleLogin = (e) => {
        e.preventDefault()
        login(dispatch, {username, password})
    }
    const navigate = useNavigate()
    const goTo = (url) => {
        navigate(url)
    }
    
    const [isToggled, setIsToggled] = useState(true)
    return (
        <Container>
            <StickyHeader navFirst={true} handleToggle={isToggled} />
            <div onClick={()=>setIsToggled(!isToggled)}>
                <Wrapper>
                    <Title>Login</Title>
                    <Form>
                        <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}  />
                        <Input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                        <Button onClick={handleLogin}>Sign in</Button>
                        {error &&
                        <Error>Incorrect username/password</Error>
                        }
                        <Register>
                            Don't have an account yet?
                            <Link onClick={()=>goTo('/register')}> Create an account</Link>
                        </Register>
                    </Form>
                </Wrapper>
                <Newsletter />
                <Footer />
            </div>
        </Container>
    )
}

export default Login