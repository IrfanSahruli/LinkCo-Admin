import { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import type { Kyc } from "../../../../types/Kyc";
import axios, { isAxiosError } from "axios";
import { useParams } from "react-router-dom";

const DetailKycUser = () => {
    const { id } = useParams();
    const [kycUser, setKycUser] = useState<Kyc>();

    useEffect(() => {
        const fetchKycUser = async () => {
            try {
                if (id) {
                    const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getOneKyc/${id}`,
                        { withCredentials: true }
                    );
                    setKycUser(res.data.data);
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(error.response?.data.message);
                }
            }
        };

        fetchKycUser();
    }, []);

    return (
        <div className="bg-white flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6 ml-[250px]">

                <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
                    {/* Gambar Produk */}
                    <div className="flex justify-center mb-6 space-x-6">
                        <img
                            src={`${import.meta.env.VITE_PUBLIC_URL}${kycUser?.ktpPhoto}`}
                            alt='Foto User'
                            className="w-[280px] h-[280px] object-cover rounded-xl shadow"
                        />
                        <img
                            src={`${import.meta.env.VITE_PUBLIC_URL}${kycUser?.selfiePhoto}`}
                            alt='Foto User'
                            className="w-[280px] h-[280px] object-cover rounded-xl shadow"
                        />
                    </div>

                    {/* Informasi Produk */}
                    <div className="space-y-4 px-2 md:px-10">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Nama Pengguna</h2>
                            <p className="text-lg text-blue-950">{kycUser?.user?.name}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Nama Lengkap Pengguna</h2>
                            <p className="text-lg text-blue-950">{kycUser?.fullName}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">NIK</h2>
                            <p className="text-lg text-green-700 font-bold">{kycUser?.nik}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Tempat/Tanggal Lahir</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{kycUser?.placeOfBirth}/{kycUser?.dateOfBirth}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Alamat</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{kycUser?.address}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Status Kyc</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{kycUser?.status}</p>
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
    );
};

export default DetailKycUser;
