import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

import Footer from "../components/Footer/Footer"
import StickyHeader from "../components/Header/StickyHeader"
import Newsletter from "../components/Newsletter/Newsletter"
import Products from "../components/Products/Products"

import { genRequest } from "../reqMethods"


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
    text-transform: capitalize;
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
    
    // const category = location.pathname.split("/")[2]
    const params = useParams()
    const category = params.category
    const search = params.term
    console.log('params:', params)

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
            // * reset one type of filter / 'ALL'
            setFilters(prevFilters => {
                const filters = {...prevFilters}
                delete filters[attr]
                return filters
            })
        }
    }

    const [sort, setSort] = useState("newest")
    const handleSort = (e) => {
        setSort(e.target.value)
    }
    
    console.log(sort)

    const [artistOptions, setArtistOptions] = useState([
        {value: '', label: 'ALL'}
    ])

    useEffect(() => {
        const getArtistList = async () => {
            const query = `/products?artists=all`
            try {
                const res = await genRequest.get(query)
                console.log(res.data)

                res.data.map(artist => artist !== '' && 
                    setArtistOptions(prevState => ([
                        ...prevState, 
                        {value: artist.toLowerCase(), label: artist}
                    ]))
                )
            } catch (err) {
                console.error(err)
            }

        }

        getArtistList()
        console.log(artistOptions)
    }, [])

    let PageTitle = ''
    if (category === 'album')
        PageTitle = 'Albums'
    else if (category === 'merch')
        PageTitle = 'Official MD'
    else if (category === 'kstyle')
        PageTitle = 'K-Style'
    else if (category === 'photo%20book')
        PageTitle = 'Photo Books'
    else {
        PageTitle = 'Shop'
    }
    
        
    const [isToggled, setIsToggled] = useState(true)
    return (
        <Container>
            <StickyHeader navFirst={false} handleToggle={isToggled} />
            <div onClick={()=>setIsToggled(!isToggled)} className="page-container">
            <Title>{PageTitle}</Title>
            <FilterContainer>
                <Filter>
                    {/* TODO: change into dynammic */}
                    <FilterText>Filter Products</FilterText>
                    <Select name="artist" onChange={handleFilters} defaultValue="Artist">
                        <Option disabled defaultValue={true}>
                            Artist
                        </Option>
                        {artistOptions && artistOptions.map((artist) => (
                            <Option value={artist.value} key={artistOptions.indexOf(artist)}>{artist.label}</Option>
                        ))}
                    </Select>
                    {category === 'album' &&
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
                    }
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
            <Products category={category} filters={filters} sort={sort} search={search} style={{margin: "auto"}}/>
            </div>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList