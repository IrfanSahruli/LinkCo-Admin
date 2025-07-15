import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import type { Order } from '../../types/Order'
import axios, { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getAllOrder`,
                    { withCredentials: true }
                );
                console.log(res);

                setOrders(res.data.data);
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(`Error: ${error.response?.data}`);
                }
            }
        };

        fetchOrderList();
    }, []);

    return (
        <div className='bg-white flex min-h-screen'>
            {/* Sidebar di kiri */}
            <Sidebar />

            {/* Konten di kanan */}
            <div className="flex-1 p-6 ml-[250px] overflow-x-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-950">Daftar Order</h1>
                </div>

                <table className="w-full text-left border shadow overflow-hidden">
                    <thead>
                        <tr className="bg-blue-950 text-white text-sm text-center">
                            <th className="px-4 py-3 border-r">Order ID</th>
                            <th className="px-4 py-3 border-r">Nama Pengguna</th>
                            <th className="px-4 py-3 border-r">Produk</th>
                            <th className="px-4 py-3 border-r">Jumlah</th>
                            <th className="px-4 py-3 border-r">Total</th>
                            <th className="px-4 py-3 border-r">Status</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 text-center align-top">
                                <td className="px-4 py-3 border-r font-semibold">{order?.orderId}</td>
                                <td className="px-4 py-3 border-r max-w-[250px]">
                                    {order?.user?.name}
                                </td>
                                <td className="px-4 py-3 border-r">
                                    <img
                                        src={`${import.meta.env.VITE_PUBLIC_URL}${order?.product?.imageUrl}`}
                                        alt={order?.product?.productName}
                                        className="w-30 h-30 object-cover rounded-md mx-auto"
                                    />
                                    <p>{order?.product?.productName}</p>
                                </td>
                                <td className="px-4 py-3 border-r max-w-[250px]">
                                    {order?.jumlah}
                                </td>
                                <td className="px-4 py-3 border-r text-blue-950 font-medium">
                                    Rp. {order?.total?.toLocaleString('id-ID')}
                                </td>
                                <td className="px-4 py-3 border-r max-w-[250px]">
                                    {order?.status}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                                        <Link to={`/order/${order?.orderId}`}>
                                            <button
                                                className="bg-blue-950 hover:bg-blue-800 text-white px-3 py-1 rounded-lg text-sm"
                                            >
                                                Detail
                                            </button>
                                        </Link>
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Selesai
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    Tidak ada produk.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderList
