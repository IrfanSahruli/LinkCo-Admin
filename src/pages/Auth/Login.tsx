import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import type { Admin } from '../../types/Admin';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [admin, setAdmin] = useState<Admin>({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAdmin((prev) => ({ ...prev, [id]: value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_PUBLIC_URL}/api/login`,
                admin,
                { withCredentials: true }
            );

            console.log(res);
            alert('Login berhasil');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='bg-blue-950 h-full md:min-h-screen'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='flex justify-center pt-10 px-4 md:py-[210px]'>
                    <img
                        src='LogoLinkCo.png'
                        className='text-white w-[100px] h-[100px] md:w-[220px] md:h-[220px] text-center font-extrabold'
                    />
                </div>
                <div className='flex justify-center mt-[50px] md:mt-[90px]'>
                    <div className='bg-white rounded-t-4xl h-[530px] w-full px-8 py-8 md:py-6 md:rounded-4xl 
                        md:h-[470px] md:w-[500px]'
                    >
                        <h1 className='text-[30px] text-center font-bold'>
                            Login
                        </h1>
                        <p className='text-[18px] text-center text-gray-600 mt-1'>
                            Selamat Datang Admin LinkCo
                        </p>
                        <div className='flex flex-col mt-10'>
                            <label
                                htmlFor="email"
                                className='text-[18px] font-semibold'
                            >
                                Email
                            </label>
                            <input
                                id='email'
                                type="text"
                                placeholder='Email...'
                                value={admin.email}
                                onChange={handleInputChange}
                                className='rounded-4xl border h-[50px] px-6 text-[18px]'
                            />
                        </div>
                        <div className="flex flex-col mt-4 relative">
                            <label htmlFor="password" className="text-[18px] font-semibold">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password..."
                                value={admin.password}
                                onChange={handleInputChange}
                                className="rounded-4xl border h-[50px] px-6 text-[18px] pr-12"
                            />
                            <div
                                className="absolute right-4 top-[42px] cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </div>
                        </div>
                        <div className='mt-10 flex justify-center'>
                            <button
                                onClick={handleLogin}
                                className='bg-blue-950 rounded-4xl w-[360px] md:w-[200px] h-[43px]'
                            >
                                <p className='font-semibold text-[18px] text-white'>
                                    Login
                                </p>
                            </button>
                        </div>
                        <p className='text-center mt-4'>
                            Belum punya akun?
                            <span className='ml-1 text-blue-950 font-semibold'>
                                <Link to={`/register`}>
                                    Daftar
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
