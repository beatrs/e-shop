
import styled from "styled-components"

import Announcement from "../Announcement/Announcement"
import Header from "./Header"
import MinHeader from "./MinHeader"

const Sticky = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
`

const StickyHeader = ({navFirst}, props) => {
    // console.log(navFirst)
    if (!navFirst) {
        return (
            <Sticky>
                <Announcement />
                <Header />
                <MinHeader />
            </Sticky>
        )
    } else {
        return (
            <Sticky>
                <Header />
                <MinHeader />
                <Announcement />
            </Sticky>
        )
    }
}



export default StickyHeader