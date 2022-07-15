import { useEffect, useState } from "react"
import "./AddEditItem.scss"
import { useLocation } from "react-router-dom"
import axios from "axios"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

const AddEditItem = ({type}) => {
    //const [item, setItem] = useState()
    const location = useLocation()
    const itemId = location.pathname.split("/")[3]
    const [item, setItem] = useState({
        name: '',
        artist: '',
        price: 0,
        desc: '',
        versions: [],
        categories: []
    })

    useEffect(() => {
        console.log('i:', itemId)
        const query = `http://localhost:5000/api/products/${itemId}`
        const getItem = async () =>  {
            try {
                const res = await axios.get(query)
                setItem(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getItem()
    }, [itemId])

    const handleFormChange = (e) => {
        const prop = e.target.name
        const val = e.target.value
        try {
            setItem(prevState => ({
                ...prevState,
                [prop]: val
            }))
            
        } catch (err) {
            console.error(err)
        }
    }

    // handle comma separated tags
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            const prop = e.target.name
            const val = e.target.value
            try {
                // check if value already exists in array
                if (!item[prop].includes(val)) {
                    setItem(prevState => ({
                        ...prevState,
                        [prop]: [...prevState[prop], val]
                    }))
                    
                    // clear after
                    e.target.value = ""
                }

            } catch (err) {
                console.error(err)
            }
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        console.log(item)
    }

    const handleDelete = (e, prop, value) => {
        e.preventDefault()
        // * takes property name since value is an object 
        const valueProp = Object.keys(value)[0]
        try {
            setItem(prevState => ({
                ...prevState,
                [prop]: prevState[prop].filter((propVal) => {
                    return propVal !== value[valueProp]
                })
            }))
            
        } catch (err) {
            console.error(err)
        }
    }

    const versionTags = item.versions && item.versions.map(version => {
        return (
            <li key={version}>
                <span className="tag--name">{version}</span>
                <button className="tag--close" onClick={(e) => handleDelete(e, 'versions', {version})}>&times;</button>
            </li>
        )
    }) 

    const categoryTags = item.categories && item.categories.map(category => {
        return (
            <li key={category}>
                <span className="tag--name">{category}</span>
                <button className="tag--close" onClick={(e) => handleDelete(e, 'categories', {category})}>&times;</button>
            </li>
        )
    })


    return (
        <div className="form">
            <Sidebar />
            <div className="form--container">
                <Navbar />
                <div className="item-form">
                    {item && 
                    <form>
                        <h2>{!itemId ? 'Add New item': 'Edit item'}</h2>
                        <div className="form--item">
                            <label>Product name:</label>
                            <input type="text" name="name" value={item.title || ""} onChange={handleFormChange} />
                        </div>
                        <div className="form--item">
                            <label>Description:</label>
                            <textarea name="description" value={item.desc || ""} className="form--textarea" onChange={handleFormChange} />
                        </div>
                        <div className="form--item">
                            <label>Artist:</label>
                            <input type="text" name="artist" value={item.artist || ""} onChange={handleFormChange} />
                        </div>
                        <div className="form--item">
                            <label>Price:</label>
                            <input type="number" name="price" value={item.price || ""} onChange={handleFormChange}  />
                        </div>
                        <div className="form--item">
                            <label>Versions:</label>
                            <div className="item--multi">
                                <input type="text" name="versions" onKeyPress={handleKeyPress} />
                                <ul className="tags">
                                    {versionTags}
                                </ul>
                            </div>
                        </div>
                        <div className="form--item">
                            <label>Categories:</label>
                            <div className="item--multi">
                                <input type="text" name="categories" onKeyPress={handleKeyPress} />
                                <ul className="tags">
                                    {categoryTags}
                                </ul>
                            </div>
                        </div>
                        
                        <button type="button" onClick={handleSave}>Save</button>
                    </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddEditItem