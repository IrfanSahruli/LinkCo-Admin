import React, { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const AddProduct = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [linkProduct, setLinkProduct] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('linkProduct', linkProduct);
        if (image) {
            formData.append('productImage', image);
        }

        try {
            await axios.post(`${import.meta.env.VITE_PUBLIC_URL}/api/addProduct`,
                formData,
                { withCredentials: true }
            );

            alert('Produk berhasil ditambahkan');
            navigate('/product');
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error.response?.data);
                alert('Gagal menambahkan produk');
            }
        }
    };

    return (
        <div className="bg-white flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 ml-[250px]">
                <div className="max-w-6xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-blue-950 mb-6">Tambah Produk</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kolom Kiri */}
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold mb-1">Nama Produk</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Deskripsi</label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Harga</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Link Produk (WA/Link)</label>
                                <input
                                    type="text"
                                    name="linkProduct"
                                    value={linkProduct}
                                    onChange={(e) => setLinkProduct(e.target.value)}
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

                    {/* Tombol Aksi */}
                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate('/product')}
                            className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
                        >
                            Kembali
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800"
                        >
                            Simpan Produk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
