import axios, { isAxiosError } from "axios";
import React, { useState } from "react";

interface RejectReasonModalProps {
    isOpen: boolean;
    onClose: () => void;
    kycId: number | null;
}

const RejectReasonModal: React.FC<RejectReasonModalProps> = ({ isOpen, onClose, kycId }) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleRejectKycUser = async () => {
        if (!kycId) return;
        if (!reason.trim()) {
            alert("Harap isi alasan penolakan!");
            return;
        }

        const payload = {
            status: 'rejected',
            rejectedReason: reason.trim()
        };

        try {
            const res = await axios.put(`${import.meta.env.VITE_PUBLIC_URL}/api/verifiedKyc/${kycId}`,
                payload,
                { withCredentials: true }
            );
            alert(res.data.message);
            setReason('');
            onClose();
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error.response?.data.message);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-[400px] shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Alasan Penolakan</h2>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tulis alasan penolakan..."
                    className="w-full border rounded-md p-2 mb-4"
                    rows={4}
                />
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleRejectKycUser}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Kirim
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectReasonModal;
