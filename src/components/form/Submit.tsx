'use client';
import React from "react";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface SubmitProps {
    message: string;
    type?: "success" | "error" | "warning";
    onClose: () => void;
}

const Submit: React.FC<SubmitProps> = ({ message, type = "success", onClose }) => {
    const styleMap = {
        success: "bg-green-600 text-white",
        error: "bg-red-600 text-white",
        warning: "bg-yellow-500 text-black",
    } as const;

    const iconMap = {
        success: <CheckCircle2 size={20} />,
        error: <XCircle size={20} />,
        warning: <AlertTriangle size={20} />,
    } as const;

    return (
        <div
            className="fixed inset-x-0 bottom-4 flex justify-center sm:justify-end px-4 z-50"
            role="status"
            aria-live="polite"
        >
            <div
                className={`flex items-center gap-3 ${styleMap[type]} px-4 py-3 rounded-lg shadow-lg w-full sm:w-auto max-w-sm sm:max-w-md animate-slide-up`}
            >
                {iconMap[type]}
                <span className="text-sm sm:text-base flex-1 break-words">{message}</span>
                <button
                    onClick={onClose}
                    aria-label="Close notification"
                    className="ml-2 text-inherit hover:opacity-80 focus:outline-none"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Submit;
