import { useEffect, useState } from "react"
import styled from "styled-components"
import Newsletter from "../components/Newsletter/Newsletter"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"
import { useNavigate } from "react-router-dom"
import Modal from "../components/Shared/Modal"
import { genRequest } from "../reqMethods"
import { serialize } from 'object-to-formdata'
import { useAlert } from "react-alert"

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
    /* text-transform: capitalize; */
    margin-bottom: 15px;
    outline: none;
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

    const RegisterBtn = {
        name: "Create Account",
        style: {
            border: "none",
            height: "40px",
            cursor: "pointer",
        }
    }

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [isUserValid, setIsUserValid] = useState(false)

    const handleFormChange = (e) => {
        const prop = e.target.name
        const val = e.target.value
        try {
            setUser(prevState => ({
                ...prevState,
                [prop]: val
            }))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const withBlanks = Object.values(user).every(x => x === null || x === '')
        if (!withBlanks && user.password === user.confirmPassword) {
            setIsUserValid(true)
        } else {
            setIsUserValid(false)
        }
    }, [user])

    const alert = useAlert()

    const handleSignUp = async(e) => {
        e.preventDefault()
        if (isUserValid) {
            const formData = serialize(user)
            console.log(formData)
            try {
                const url = '/auth/register'
                const res = await genRequest.post(url, formData)
                if (res) {
                    console.log('signup success')
                    alert.success('Account successfully created!')
                    goTo("/login")
                }
            } catch (err) {
                console.log(err)
                alert.error('Something went wrong.')
            }
        } else {
            alert.error('Something went wrong.')
        }
        
    }


    return (
        <Container>
            <StickyHeader handleToggle={isToggled} />
            <div onClick={()=>setIsToggled(!isToggled)}>
            <Wrapper>
                <Title>Create an account</Title>
                <Form>
                    <Name>
                        <Input type="text" placeholder="First name" name="firstName" onChange={handleFormChange} required />
                        <Input type="text" placeholder="Last name" name="lastName" onChange={handleFormChange} required />
                    </Name>
                    <Input type="text" placeholder="Username" name="username" onChange={handleFormChange} required />
                    <Input type="email" placeholder="Email" name="email" onChange={handleFormChange} required />
                    <Input type="password" placeholder="Password" name="password" onChange={handleFormChange} required />
                    <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleFormChange} required />
                    <Agreement>
                        By clicking Create Account, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.
                    </Agreement>
                    <Button onClick={handleSignUp}>Create Account</Button>
                    
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