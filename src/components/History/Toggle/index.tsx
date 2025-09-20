import { HistoryIcon } from "lucide-react";

interface ToggleProps {
    shortenedUrls: {
        id: string;
        original: string;
        shortened: string;
        createdAt: string;
    }[];
    showHistory: boolean;
    setShowHistory: (show: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
    shortenedUrls,
    showHistory,
    setShowHistory
}) => {

    return (
        <div>
            {shortenedUrls.length > 0 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <HistoryIcon className="w-5 h-5" />
                        <span className="cursor-pointer">{showHistory ? "Ocultar Histórico" : `Ver Histórico (${shortenedUrls.length})`}</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Toggle;