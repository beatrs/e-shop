import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/Widget'
import { table as Table } from '../../components/table/Table'
import './Home.scss'
import { MdOutlineAttachMoney, MdShoppingCart } from "react-icons/md";
const Home = () => {
    return(
        <div className='home'>
            <Sidebar />
            <div className='home--container'>
                <Navbar />
                <div className='widgets'>
                    <Widget 
                        title='users'
                        icon={<MdOutlineAttachMoney className='widgets--icon'/>}
                        bdColor='salmon'
                        etcLbl='View all'
                        value='42609'
                        valueIcon={<MdOutlineAttachMoney />}
                    />
                    <Widget 
                        title='orders'
                        icon={<MdShoppingCart className='widgets--icon'/>}
                        bdColor='#1ac489'
                        etcLbl='View all'
                        value='120'
                    />
                    <Widget 
                        title='sales'
                        icon={<MdOutlineAttachMoney className='widgets--icon'/>}
                        bdColor='#3cb8ce'
                        etcLbl='View all'
                        value='42609'
                        valueIcon={<MdOutlineAttachMoney />}
                    />
                    <Widget 
                        title='revenue'
                        icon={<MdOutlineAttachMoney className='widgets--icon'/>}
                        bdColor='#f3c85b'
                        etcLbl='View all'
                        value='42609'
                        valueIcon={<MdOutlineAttachMoney />}
                    />
                </div>
                <div className='list--container'>
                    <div className='list--title'>list container</div>
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default Home