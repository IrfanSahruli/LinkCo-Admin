import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import type { Order } from '../../../types/Order'
import { useParams } from 'react-router-dom'
import axios, { isAxiosError } from 'axios'

const DetailOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<Order>();

    useEffect(() => {
        const fetchDetailOrder = async () => {
            try {
                if (id) {
                    const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getOneOrder/${id}`,
                        { withCredentials: true }
                    );
                    setOrder(res.data.data);
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(error.response?.data);
                }
            }
        };

        fetchDetailOrder();
    }, []);

    if (!order) return <div className="text-center mt-20 text-gray-500">
        Memuat detail order...
    </div>;

    return (
        <div className="bg-white flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6 ml-[250px]">

                <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
                    {/* Gambar Produk */}
                    <div className="justify-items-center mb-6">
                        <img
                            src={`${import.meta.env.VITE_PUBLIC_URL}${order?.product?.imageUrl}`}
                            alt={order?.product?.productName}
                            className="w-[280px] h-[280px] object-cover rounded-xl shadow"
                        />
                        <p className='mt-2 text-[25px] font-semibold'>{order?.product?.productName}</p>
                    </div>

                    {/* Informasi Produk */}
                    <div className="space-y-4 px-2 md:px-10">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Order ID</h2>
                            <p className="text-lg text-blue-950">{order?.orderId}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Nama Pengguna</h2>
                            <p className="text-lg text-green-700 font-bold">{order?.user?.name}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Jumlah</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{order?.jumlah}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Total Order</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{order?.total}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Status Order</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{order?.status}</p>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8 gap-x-2">
                        <button
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-800"
                        >
                            Tolak
                        </button>
                        <button
                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-800"
                        >
                            Setujui
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailOrder
