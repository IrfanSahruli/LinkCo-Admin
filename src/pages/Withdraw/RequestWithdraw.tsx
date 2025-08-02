import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import type { Withdraw } from '../../types/User';
import axios, { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';

const RequestWithdraw = () => {
    const [withdraws, setWithdraws] = useState<Withdraw[]>([]);

    useEffect(() => {
        const fetchRequestWithdraw = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getAllWithdraw`,
                    { withCredentials: true }
                );
                setWithdraws(res.data.data);
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(`Error: ${error.response?.data}`);
                }
            }
        };

        fetchRequestWithdraw();
    }, []);

    return (
        <div className='bg-white flex min-h-screen'>
            {/* Sidebar di kiri */}
            <Sidebar />

            {/* Konten di kanan */}
            <div className="flex-1 p-6 ml-[250px] overflow-x-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-950">Daftar Request Withdraw</h1>
                </div>

                <table className="w-full text-left border shadow overflow-hidden">
                    <thead>
                        <tr className="bg-blue-950 text-white text-sm text-center">
                            <th className="px-4 py-3 border-r">Nama</th>
                            <th className="px-4 py-3 border-r">Payment</th>
                            <th className="px-4 py-3 border-r">No Rekening</th>
                            <th className="px-4 py-3 border-r">Total</th>
                            <th className="px-4 py-3 border-r">Selfie Foto</th>
                            <th className="px-4 py-3 border-r">Status</th>
                            <th className="px-4 py-3 border-r">Alasan Penolakan</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {withdraws.map((withdraw, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 text-center align-top">
                                <td className="px-4 py-3 border-r font-semibold">
                                    {withdraw?.user?.name}
                                </td>
                                <td className="px-4 py-3 border-r max-w-[250px]">
                                    {withdraw?.withdrawTo}
                                </td>
                                <td className="px-4 py-3 border-r text-blue-950 font-medium">
                                    {withdraw?.noRekening}
                                </td>
                                <td className="px-4 py-3 border-r text-blue-950 font-medium">
                                    {withdraw?.totalWithdraw}
                                </td>
                                <td className="px-4 py-3 border-r">
                                    <img
                                        src={`${import.meta.env.VITE_PUBLIC_URL}${withdraw?.selfiePhoto}`}
                                        alt={withdraw?.selfiePhoto}
                                        className="w-30 h-30 object-cover rounded-md mx-auto"
                                    />
                                </td>
                                <td className="px-4 py-3 border-r text-blue-950 font-medium">
                                    {withdraw?.status}
                                </td>
                                <td className="px-4 py-3 border-r text-blue-950 font-medium">
                                    {withdraw?.rejectedReason}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                                        <Link to={`/requestwithdraw/${withdraw?.id}`}>
                                            <button
                                                className="bg-blue-950 hover:bg-blue-800 text-white px-3 py-1 rounded-lg text-sm"
                                            >
                                                Detail
                                            </button>
                                        </Link>
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Setujui
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {withdraws.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    Tidak ada request withdraw.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default RequestWithdraw;
