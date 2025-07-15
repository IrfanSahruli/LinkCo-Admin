import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar';
import type { Product } from '../../../types/Product';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({
        productName: '',
        description: '',
        price: 0,
        linkProduct: '',
        imageUrl: ''
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getOneProduct/${id}`, {
                    withCredentials: true,
                });
                console.log(res);

                setProduct(res.data.data);
                setPreview(`${import.meta.env.VITE_PUBLIC_URL}${res.data.data.imageUrl}`);
            } catch (error) {
                console.error(error);
                alert('Gagal mengambil data produk');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', product.productName || '');
        formData.append('description', product.description || '');
        formData.append('price', product?.price?.toString() || '0');
        formData.append('linkProduct', product.linkProduct || '');
        if (image) formData.append('productImage', image);

        try {
            await axios.put(`${import.meta.env.VITE_PUBLIC_URL}/api/updateProduct/${id}`,
                formData,
                { withCredentials: true }
            );

            alert('Produk berhasil diperbarui');
            navigate('/product');
        } catch (error) {
            console.error(error);
            alert('Gagal memperbarui produk');
        }
    };

    return (
        <div className="bg-white flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 ml-[250px]">
                <div className="max-w-6xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-blue-950 mb-6">Edit Produk</h1>

                    <form onSubmit={handleUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Kolom Kiri */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-semibold mb-1">Nama Produk</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={product.productName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Deskripsi</label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        value={product.description}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Harga</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Link Produk (WA/Link)</label>
                                    <input
                                        type="text"
                                        name="linkProduct"
                                        value={product.linkProduct}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2"
                                    />
                                </div>
                            </div>

                            {/* Kolom Kanan */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-semibold mb-1">Gambar Produk</label>
                                    <div className="border border-dashed rounded-lg p-4 text-center">
                                        <input type="file" onChange={handleImageChange} />
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-40 h-40 object-cover rounded-md mx-auto mt-2"
                                            />
                                        ) : (
                                            <p className="text-gray-400 mt-2">+ Tambah Gambar</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                type="button"
                                onClick={() => navigate('/product')}
                                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
