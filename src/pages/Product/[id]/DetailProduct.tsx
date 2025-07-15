import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar';
import type { Product } from '../../../types/Product';

const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/getOneProduct/${id}`, {
                    withCredentials: true,
                });
                setProduct(res.data.data);
            } catch (error) {
                console.error(error);
                alert('Gagal mengambil data produk');
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div className="text-center mt-20 text-gray-500">Memuat detail produk...</div>;

    return (
        <div className="bg-white flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 ml-[250px]">
                <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
                    {/* Gambar Produk */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={`${import.meta.env.VITE_PUBLIC_URL}${product.imageUrl}`}
                            alt={product.productName}
                            className="w-[280px] h-[280px] object-cover rounded-xl shadow"
                        />
                    </div>

                    {/* Informasi Produk */}
                    <div className="space-y-4 px-2 md:px-10">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Nama Produk</h2>
                            <p className="text-lg text-blue-950">{product.productName}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Harga</h2>
                            <p className="text-lg text-green-700 font-bold">Rp. {product?.price?.toLocaleString()}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Deskripsi</h2>
                            <p className="text-md text-gray-800 whitespace-pre-line">{product.description}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-1">Link Produk</h2>
                            <a
                                href={product.linkProduct}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-700 underline break-all hover:text-blue-500"
                            >
                                {product.linkProduct}
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            onClick={() => navigate('/product')}
                            className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900"
                        >
                            Kembali ke Daftar Produk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
