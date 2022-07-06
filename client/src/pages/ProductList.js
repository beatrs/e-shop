import { useEffect } from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"
import Newsletter from "../components/Newsletter/Newsletter"
import Products from "../components/Products/Products"


const Container = styled.div``

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;

    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`
const Filter = styled.div`
    margin: 20px;
    display: flex;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        width: 60%;
    }
`

const Title = styled.h1`
    margin: 20px;
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 15px;
`

const Select = styled.select`
    padding: 5px;
    margin-right: 15px;
`

const Option = styled.option``

const ProductList = () => {
    const location = useLocation()
    
    const category = location.pathname.split("/")[2]

    const [filters, setFilters] = useState()
    const handleFilters = (e) => {
        const value = e.target.value
        const attr = e.target.name
        console.log(e.target.name)
        setFilters({
            ...filters,
            [attr]: value,
        })
        if (value === '') {
            setFilters(prevFilters => {
                const filters = {...prevFilters}
                delete filters[attr]
                return filters
            })
            // const { attr, ...others} = attr
            console.log('attr:',attr)
            console.log('filters',filters)
            // setFilters(others)
        }
    }

    const [sort, setSort] = useState("newest")
    const handleSort = (e) => {
        setSort(e.target.value)
    }
    
    console.log(sort)

    const artistOptions = [
        {value: '', label: 'Artist'},
        {value: '', label: 'ALL'},
        {value: 'kwon eun bi', label: 'Kwon Eun Bi'},
        {value: 'jo yuri', label: 'Jo Yuri'},
        {value: 'ive', label: 'IVE'},
        {value: 'kang hye won', label: 'Kang Hye Won'},
        {value: 'le sserafim', label: 'LE SSERAFIM'},
        {value: 'fromis_9', label: 'fromis_9'},
        {value: 'txt', label: 'TXT'},
    ]
    return (
        <Container>
            <StickyHeader navFirst={false} />
            <Title>Albums</Title>
            <FilterContainer>
                <Filter>
                    {/* TODO: change into dynammic */}
                    <FilterText>Filter Products</FilterText>
                    <Select name="artist" onChange={handleFilters} defaultValue="Artist">
                        <Option disabled defaultValue={true}>
                            Artist
                        </Option>
                        <Option value="">ALL</Option>
                        <Option value="kwon eun bi">Kwon Eun Bi</Option>
                        <Option value="jo yuri">Jo Yuri</Option>
                        <Option value="ive">IVE</Option>
                        <Option value="kang hye won">Kang Hye Won</Option>
                        <Option value="yena">YENA</Option>
                        <Option value="le sserafim">Le Sserafim</Option>
                        <Option value="txt">TXT</Option>
                        <Option value="fromis_9">fromis_9</Option>
                    </Select>
                    <Select name="type" onChange={handleFilters} defaultValue="Type">
                        <Option disabled defaultValue={true}>
                            Type
                        </Option>
                        <Option value="">ALL</Option>
                        <Option value="single">Single</Option>
                        <Option value="mini">Mini Album</Option>
                        <Option>Full-length Album</Option>
                        <Option>Digipack / Kihno</Option>
                        <Option>Jewel Case</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products</FilterText>
                    <Select onChange={handleSort}>
                        <Option value="newest">
                            Newest
                        </Option>
                        <Option value="asc">
                            Price (lowest to highest)
                        </Option>
                        <Option value="desc">
                            Price (highest to lowest)
                        </Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList