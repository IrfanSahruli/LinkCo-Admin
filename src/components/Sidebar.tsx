import { AiFillProduct } from 'react-icons/ai';
import { BiMoneyWithdraw, BiUser } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { GrTransaction } from 'react-icons/gr';
import { MdDashboard } from 'react-icons/md';
import { SiKnowledgebase } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: <MdDashboard size={30} />,
        },
        {
            path: '/user',
            label: 'UserList',
            icon: <BiUser size={30} />,
        },
        {
            path: '/kycuser',
            label: 'Kyc User',
            icon: <SiKnowledgebase size={30} />,
        },
        {
            path: '/order',
            label: 'Order',
            icon: <GrTransaction size={30} />,
        },
        {
            path: '/requestwithdraw',
            label: 'Withdraw',
            icon: <BiMoneyWithdraw size={30} />,
        },
        {
            path: '/product',
            label: 'Product',
            icon: <AiFillProduct size={30} />,
        },
    ];

    return (
        <div className='flex flex-col h-screen w-[250px] bg-blue-950 rounded-r-xl px-4 py-2 items-center fixed'>
            <div className='mt-[30px]'>
                <img
                    src="/LogoLinkCo.png"
                    alt="Logo LinkCo"
                    className='w-[100px] h-[100px]'
                />
            </div>

            <ul className='mt-6 space-y-4 w-full'>
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-2 rounded-2xl font-semibold 
                                ${isActive ? 'bg-white text-blue-950' : 'text-white hover:bg-blue-800'}`}
                            >
                                {item.icon}
                                <span className='text-[20px] ml-2'>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className='mt-auto'>
                <button className='flex bg-red-700 items-center text-white font-semibold px-10 py-2 rounded-2xl'>
                    <FiLogOut size={30} />
                    <span className='text-[20px] ml-2'>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
