import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar"
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import type { Kyc } from "../../../types/Kyc";
import RejectReasonModal from "../../../components/RejectReasonModal";

const KycUser = () => {
    const navigate = useNavigate();
    const [kycUsers, setKycUsers] = useState<Kyc[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKycId, setSelectedKycId] = useState<number | null>(null);

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

    const handleViewDetail = (id: number) => {
        try {
            if (id) {
                navigate(`/detailkycuser/${id}`)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAcceptKycUser = async (id: number) => {
        const payload = {
            status: 'verified'
        };

        try {
            if (id) {
                const res = await axios.put(`${import.meta.env.VITE_PUBLIC_URL}/api/verifiedKyc/${id}`,
                    payload,
                    { withCredentials: true }
                );
                alert(res.data.message);
                fetchKycUsers();
            }
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error.response?.data.message);
            }
        }
    };

    return (
        <div className='bg-white flex min-h-screen'>
            {isModalOpen && (
                <RejectReasonModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    kycId={selectedKycId}
                />
            )}
            <Sidebar />

            <div className='flex-1 p-6 ml-[250px] overflow-x-auto'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-950">
                        Data Kyc User
                    </h1>
                </div>

                <table className="w-full text-left border border-collapse shadow overflow-hidden">
                    <thead>
                        <tr className="bg-blue-950 text-white text-sm text-center">
                            <th className="px-4 py-3 border">Nama</th>
                            <th className="px-4 py-3 border">Nama Lengkap</th>
                            <th className="px-4 py-3 border">NIK</th>
                            <th className="px-4 py-3 border">Tempat, Tanggal Lahir</th>
                            <th className="px-4 py-3 border">Alamat</th>
                            <th className="px-4 py-3 border">Foto Ktp</th>
                            <th className="px-4 py-3 border">Foto Selfie</th>
                            <th className="px-4 py-3 border">Status</th>
                            <th className="px-4 py-3 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {kycUsers.map((kyc, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center align-top">
                                <td className="px-4 py-3 border font-semibold">{kyc?.user?.name}</td>
                                <td className="px-4 py-3 border font-semibold">{kyc?.fullName}</td>
                                <td className="px-4 py-3 border font-semibold">{kyc?.nik}</td>
                                <td className="px-4 py-3 border font-semibold">
                                    {kyc?.placeOfBirth}, {kyc?.dateOfBirth}
                                </td>
                                <td className="px-4 py-3 border font-semibold">
                                    {kyc?.address}
                                </td>
                                <td className="px-4 py-3 border">
                                    <div className="w-20 h-20 mx-auto rounded-md overflow-hidden">
                                        <img
                                            src={`${import.meta.env.VITE_PUBLIC_URL}${kyc?.ktpPhoto}`}
                                            alt={kyc?.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3 border">
                                    <div className="w-20 h-20 mx-auto rounded-md overflow-hidden">
                                        <img
                                            src={`${import.meta.env.VITE_PUBLIC_URL}${kyc?.selfiePhoto}`}
                                            alt={kyc?.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3 border font-semibold">{kyc?.status}</td>
                                <td className="px-4 py-3 border">
                                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                                        <button
                                            onClick={() => handleViewDetail(Number(kyc?.id))}
                                            className="bg-blue-950 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            onClick={() => handleAcceptKycUser(Number(kyc?.id))}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Terima
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedKycId(Number(kyc?.id));
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default KycUser
