import styled from "styled-components"
import Newsletter from "../components/Newsletter/Newsletter"
import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"

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

const Register = styled.span`
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
`

const Link = styled.a`
    cursor: pointer;
    color: #709f70;
`

const Button = styled.button`
    border: none;
    height: 40px;
    cursor: pointer;
`

const Login = () => {
    return (
        <Container>
            <StickyHeader navFirst={true}/>
            <Wrapper>
                <Title>Login</Title>
                <Form>
                    <Input placeholder="email" />
                    <Input placeholder="password" />
                    <Button>Sign in</Button>
                    <Register>
                        Don't have an account yet?
                        <Link> Create an account</Link>
                    </Register>
                </Form>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Login