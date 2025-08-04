import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar"
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import type { Kyc } from "../../../types/Kyc";

const KycUser = () => {
    const navigate = useNavigate();
    const [kycUsers, setKycUsers] = useState<Kyc[]>([]);

    useEffect(() => {
        fetchKycUsers();
    }, []);

    const fetchKycUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getAllKyc`,
                { withCredentials: true }
            );
            console.log(res);
            setKycUsers(res.data.data);
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error.response?.data.message);
            }
        }
    };

    const handleEdit = (id: number) => {
        try {
            if (id) {
                navigate(`/detailkycuser/${id}`)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleView = (id: number) => {
        try {
            if (id) {
                navigate(`/detailkycuser/${id}`)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Yakin ingin menghapus user ini?");
        try {
            if (confirm) {
                if (id) {
                    await axios.delete(`${import.meta.env.VITE_PUBLIC_URL}/api/deleteProduct/${id}`,
                        { withCredentials: true }
                    );

                    alert('Berhasil hapus product');
                    fetchKycUsers();
                }
            }
        } catch (error) {
            if (isAxiosError(error)) {
                alert('Gagal hapus product');
                console.error(error.response?.data);
            }
        }
    };

    return (
        <div className='bg-white flex min-h-screen'>
            <Sidebar />

            <div className='flex-1 p-6 ml-[250px] overflow-x-auto'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-950">
                        Data Kyc User
                    </h1>
                </div>

                <table className="w-full text-left border shadow overflow-hidden">
                    <thead>
                        <tr className="bg-blue-950 text-white text-sm text-center">
                            <th className="px-4 py-3 border-r">Nama</th>
                            <th className="px-4 py-3 border-r">Nama Lengkap</th>
                            <th className="px-4 py-3 border-r">NIK</th>
                            <th className="px-4 py-3 border-r">Tempat, Tanggal Lahir</th>
                            <th className="px-4 py-3 border-r">Alamat</th>
                            <th className="px-4 py-3 border-r">Foto Ktp</th>
                            <th className="px-4 py-3 border-r">Foto Selfie</th>
                            <th className="px-4 py-3 border-r">Status</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {kycUsers.map((kyc, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 text-center align-top">
                                <td className="px-4 py-3 border-r font-semibold">
                                    {kyc?.user?.name}
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {kyc?.fullName}
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {kyc?.nik}
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {kyc?.placeOfBirth}, {kyc?.dateOfBirth}
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {kyc?.address}
                                </td>
                                <td className="px-4 py-3 border-r">
                                    <img
                                        src={`${import.meta.env.VITE_PUBLIC_URL}${kyc?.ktpPhoto}`}
                                        alt={kyc?.fullName}
                                        className="w-30 h-30 object-cover rounded-md mx-auto"
                                    />
                                </td>
                                <td className="px-4 py-3 border-r">
                                    <img
                                        src={`${import.meta.env.VITE_PUBLIC_URL}${kyc?.selfiePhoto}`}
                                        alt={kyc?.fullName}
                                        className="w-30 h-30 object-cover rounded-md mx-auto"
                                    />
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {kyc?.status}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                                        <button
                                            onClick={() => handleView(Number(kyc?.id))}
                                            className="bg-blue-950 hover:bg-blue-800 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            onClick={() => handleEdit(Number(kyc?.id))}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(Number(kyc?.id))}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {kycUsers.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    Tidak ada data kyc user.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default KycUser
