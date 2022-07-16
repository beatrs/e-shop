import { useEffect, useState } from "react"
import "./AddEditItem.scss"
import { useLocation } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import { userRequest } from "../../reqMethods"

const AddEditItem = ({type}) => {
    //const [item, setItem] = useState()
    const location = useLocation()
    const itemId = location.pathname.split("/")[3]
    const [item, setItem] = useState({
        title: '',
        artist: '',
        price: 0,
        desc: '',
        versions: [],
        categories: [],
        cover: '',
        coverAlt: ''
    })

    useEffect(() => {
        const query = `http://localhost:5000/api/products/${itemId}`
        const getItem = async () =>  {
            try {
                const res = await userRequest.get(query)
                setItem(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        if (itemId) {
            getItem()
        }
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

    const handleSave =  async (e) => {
        // e.preventDefault()
        console.log(item)
        console.log(image.file)
        console.log(image.previewUrl)

        try {
            let url = `/products`
            if (itemId) {
                url += `/${itemId}`
                const res = await userRequest.put(url, item)
                console.log(res.data)
            } else {
                const res = await userRequest.post(url, item)
                console.log(res.data)
            }
        } catch (err) {
            console.error(err)
        }


        //TODO: show success modal after save and then navigate to main list from there
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


    const [image, setImage] = useState({
        file: '',
        previewUrl: ''
    })

    const handleImgChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            setImage({
                file: file,
                previewUrl: reader.result
            })
            setItem(prevState => ({
                ...prevState,
                cover: reader.result
            }))
        }
        reader.readAsDataURL(file)
        
    }



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
                            <input type="text" name="title" value={item.title || ""} onChange={handleFormChange} />
                        </div>
                        <div className="form--item">
                            <label>Description:</label>
                            <textarea name="desc" value={item.desc || ""} className="form--textarea" onChange={handleFormChange} />
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
                                <span className="help">Hit enter or comma to add tags</span>
                                <ul className="tags">
                                    {versionTags}
                                </ul>
                            </div>
                        </div>
                        <div className="form--item">
                            <label>Categories:</label>
                            <div className="item--multi">
                                <input type="text" name="categories" onKeyPress={handleKeyPress} />
                                <span className="help">Hit enter or comma to add tags</span>
                                <ul className="tags">
                                    {categoryTags}
                                </ul>
                            </div>
                        </div>

                        <div className="form--item">
                            <label>Main Image:</label>
                            <div className="input--wrapper">
                                <div className="image--input">
                                    <div className="image" style={{ backgroundImage: itemId? `url(${item.cover})` : `url(${image.previewUrl})` }}>
                                        <div className="upload-btn" style={{ opacity: image.previewUrl !== '' || item.cover !== '' ? '0' : '1' }}>
                                            <input type="file" onChange={(e)=>handleImgChange(e)} />
                                            <button type="button">Click here to upload an image</button>
                                        </div>
                                    </div>
                                    
                                    <input type="text" name="coverAlt" value={item.coverAlt || ""} onChange={handleFormChange}  placeholder="Image Alt Text" />
                                </div>
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