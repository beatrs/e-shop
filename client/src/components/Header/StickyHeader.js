
import styled from "styled-components"

import Announcement from "../Announcement/Announcement"
import Header from "./Header"

const Sticky = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
`

const StickyHeader = ({navFirst}) => {
    // console.log(navFirst)
    if (!navFirst) {
        return (
            <Sticky>
                <Announcement />
                <Header />
            </Sticky>
        )
    } else {
        return (
            <Sticky>
                <Header />
                <Announcement />
            </Sticky>
        )
    }
}



export default StickyHeader