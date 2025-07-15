import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import axios, { isAxiosError } from 'axios';
import type { Product } from '../../types/Product';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getAllProduct`);
            console.log(res);
            setProducts(res.data.data);
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
                    const res = await axios.delete(`${import.meta.env.VITE_PUBLIC_URL}/api/deleteProduct/${id}`,
                        { withCredentials: true }
                    );

                    alert('Berhasil hapus product');
                    fetchProducts();
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
            {/* Sidebar di kiri */}
            <Sidebar />

            {/* Konten di kanan */}
            <div className="flex-1 p-6 ml-[250px] overflow-x-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-950">Daftar Produk</h1>
                    <Link to={'/addproduct'}>
                        <button className="bg-blue-800 text-white px-5 py-2 rounded-2xl font-semibold hover:bg-blue-900">
                            + Tambah Produk
                        </button>
                    </Link>
                </div>

                <table className="w-full text-left border shadow overflow-hidden">
                    <thead>
                        <tr className="bg-blue-950 text-white text-sm text-center">
                            <th className="px-4 py-3 border-r">Gambar</th>
                            <th className="px-4 py-3 border-r">Nama Produk</th>
                            <th className="px-4 py-3 border-r">Deskripsi</th>
                            <th className="px-4 py-3 border-r">Harga</th>
                            <th className="px-4 py-3 border-r">Link Produk</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {products.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 text-center align-top">
                                <td className="px-4 py-3 border-r">
                                    <img
                                        src={`${import.meta.env.VITE_PUBLIC_URL}${item?.imageUrl}`}
                                        alt={item?.productName}
                                        className="w-30 h-30 object-cover rounded-md mx-auto"
                                    />
                                </td>
                                <td className="px-4 py-3 border-r font-semibold">{item?.productName}</td>
                                <td className="px-4 py-3 border-r max-w-[250px]">
                                    <p className="line-clamp-2">{item?.description}</p>
                                </td>
                                <td className="px-4 py-3 border-r text-blue-950 font-medium">
                                    Rp. {item?.price?.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 border-r break-all text-blue-800 underline hover:text-blue-600">
                                    <a href={item?.linkProduct} target="_blank" rel="noreferrer">
                                        {item?.linkProduct}
                                    </a>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                                        <button
                                            onClick={() => handleView(Number(item?.id))}
                                            className="bg-blue-950 hover:bg-blue-800 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Detail
                                        </button>
                                        <button
                                            onClick={() => handleEdit(Number(item?.id))}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(Number(item?.id))}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {products.length === 0 && (
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
};

export default ProductList;
