
import { useState, useEffect } from "react"
import styled from "styled-components"

import Announcement from "../Announcement/Announcement"
import Sidebar from "../Sidebar/Sidebar"
import Header from "./Header"
import MinHeader from "./MinHeader"

const Sticky = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
`

const StickyHeader = ({navFirst, handleToggle}) => {
    
    const [isToggled, setIsToggled] = useState(false)
    useEffect(() => {        
        // TODO: change logic
        // every time rest of page is clicked, handleToggle is changed triggering the next line
        setIsToggled(false)
    }, [handleToggle])
    
    if (!navFirst) {
        return (
            <Sticky >
                <Sidebar styleProp={isToggled} />
                <Announcement />
                <Header handleMenuClick={()=>setIsToggled(true)} />
                {/* <MinHeader /> */}
            </Sticky>
        )
    } else {
        return (
            <Sticky>
                <Sidebar styleProp={isToggled} />
                <Header handleMenuClick={()=>setIsToggled(true)} />
                {/* <MinHeader /> */}
                <Announcement />
            </Sticky>
        )
    }
}



export default StickyHeader