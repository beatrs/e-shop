
import styled from "styled-components"
import { categories } from "../../data"
import CategoryItem from "./CategoryItem"

const Container = styled.div`
    display: flex;
    padding: 15px;

    
    @media only screen and (max-width: 479px) {
        flex-direction: column;
    }
`


const Categories = () => {
    return (
        <Container>
            {categories.map(item => (
              <CategoryItem key={item.id} item={item}/>  
            ))}
        </Container>
    )
}

export default Categories