import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import type { Statistik } from '../../types/Order';
import axios, { isAxiosError } from 'axios';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BiMoney, BiUser } from 'react-icons/bi';
import { RiOrderPlayFill } from 'react-icons/ri';
import { AiFillProduct } from 'react-icons/ai';

const Dashboard = () => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [stats, setStats] = useState<Statistik[]>([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PUBLIC_URL}/api/sttsYear?year=${selectedYear}`,
                    { withCredentials: true }
                );
                console.log(res);
                setStats(res.data.data);
            } catch (error) {
                if (isAxiosError(error)) {
                    console.log(error.response?.data.message);
                }
            }
        };

        fetchStats();
    }, [selectedYear]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    const chartData = stats.map(item => ({
        month: monthNames[item.month - 1],
        totalIncome: item.totalIncome
    }));

    // if (loading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen">
            {/* Sidebar langsung */}
            <Sidebar />

            <div className="flex p-6 ml-[250px] gap-6">
                {/* Card 1 */}
                <div className="flex items-center bg-white w-[250px] p-4 rounded-lg shadow-lg">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                        <BiMoney size={40} className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-600 text-sm font-medium">Total Pendapatan</h4>
                        <p className="text-xl font-bold text-gray-800">Rp 250.000.000</p>
                    </div>
                </div>

                <div className="flex items-center bg-white w-[250px] p-4 rounded-lg shadow-lg">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                        <RiOrderPlayFill size={40} className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-600 text-sm font-medium">Total Order</h4>
                        <p className="text-xl font-bold text-gray-800">1000</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center bg-white w-[250px] p-4 rounded-lg shadow-lg">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                        <BiUser size={40} className="text-green-600" />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-600 text-sm font-medium">Total User</h4>
                        <p className="text-xl font-bold text-gray-800">100</p>
                    </div>
                </div>

                <div className="flex items-center bg-white w-[250px] p-4 rounded-lg shadow-lg">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                        <AiFillProduct size={40} className="text-green-600" />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-gray-600 text-sm font-medium">Total Produk</h4>
                        <p className="text-xl font-bold text-gray-800">100</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 ml-[250px]">
                {/* Filter Tahun */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Statistik Pendapatan</h2>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="border border-gray-300 rounded px-3 py-1"
                    >
                        {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                        <Line type="monotone" dataKey="totalIncome" stroke="#003CB4" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
