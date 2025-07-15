import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import type { Withdraw } from '../../../types/User';
import axios, { isAxiosError } from 'axios';
import Sidebar from '../../../components/Sidebar';

const DetailWithdraw = () => {
    const { id } = useParams();
    const [withdraw, setWithdraw] = useState<Withdraw>();

    useEffect(() => {
        const fetchRequestWithdraw = async () => {
            try {
                if (id) {
                    const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getOneWithdraw/${id}`,
                        { withCredentials: true }
                    );
                    setWithdraw(res.data.data);
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(`Error: ${error.response?.data}`);
                }
            }
        };

        fetchRequestWithdraw();
    }, []);

    if (!withdraw) return <div className="text-center mt-20 text-gray-500">
        Memuat detail request withdraw...
    </div>;

    return (
        <div className="bg-white flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6 ml-[250px]">

                <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
                    {/* Gambar Produk */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={`${import.meta.env.VITE_PUBLIC_URL}${withdraw.selfiePhoto}`}
                            alt='Foto User'
                            className="w-[280px] h-[280px] object-cover rounded-xl shadow"
                        />
                    </div>

                    {/* Informasi Produk */}
                    <div className="space-y-4 px-2 md:px-10">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Nama Pengguna</h2>
                            <p className="text-lg text-blue-950">{withdraw?.user?.name}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Payment</h2>
                            <p className="text-lg text-green-700 font-bold">{withdraw?.withdrawTo}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">No Rekening</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{withdraw?.noRekening}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Total Penarikan</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{withdraw?.totalWithdraw}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Status Penarikan</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{withdraw?.status}</p>
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
};

export default DetailWithdraw;
