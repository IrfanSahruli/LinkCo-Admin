import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import type { User } from '../../types/User';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getAllUser`);
            console.log(res);
            setUsers(res.data.data);
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error.response?.data.message);
            }
        }
    };

    const handleEdit = (id: number) => {
        try {
            if (id) {
                navigate(`/updateproduct/${id}`)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleView = (id: number) => {
        try {
            if (id) {
                navigate(`/detailproduct/${id}`)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Yakin ingin menghapus produk ini?");
        try {
            if (confirm) {
                if (id) {
                    await axios.delete(`${import.meta.env.VITE_PUBLIC_URL}/api/deleteProduct/${id}`,
                        { withCredentials: true }
                    );

                    alert('Berhasil hapus product');
                    fetchUsers();
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
                        Daftar User
                    </h1>
                </div>

                <table className="w-full text-left border shadow overflow-hidden">
                    <thead>
                        <tr className="bg-blue-950 text-white text-sm text-center">
                            <th className="px-4 py-3 border-r">Nama</th>
                            <th className="px-4 py-3 border-r">Email</th>
                            <th className="px-4 py-3 border-r">HandPhone</th>
                            <th className="px-4 py-3 border-r">Saldo</th>
                            <th className="px-4 py-3 border-r">isKYCApproved</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {users.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 text-center align-top">
                                <td className="px-4 py-3 border-r font-semibold">
                                    {user?.name}
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {user?.email}
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {user?.noHandPhone}
                                </td>
                                <td className="px-4 py-3 border-r text-blue-950 font-medium">
                                    Rp. {user?.saldo?.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">
                                    {user?.isKYCApproved}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                                        <button
                                            onClick={() => handleView(Number(user?.id))}
                                            className="bg-blue-950 hover:bg-blue-800 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            onClick={() => handleEdit(Number(user?.id))}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(Number(user?.id))}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    Tidak ada data user.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersList;
