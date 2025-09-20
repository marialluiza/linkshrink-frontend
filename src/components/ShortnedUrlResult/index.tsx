import { Copy } from "lucide-react";

interface ShortnedUrlProps {
    shortenedUrls: {
        id: string;
        original: string;
        shortened: string;
    }[];
    copiedId: string | null;
    copyToClipboard: (text: string, id: string) => void;
}

const ShortnedUrlResult: React.FC<ShortnedUrlProps> = ({
    shortenedUrls,
    copiedId,
    copyToClipboard
}) => {
    return (
        <div>
            {shortenedUrls.length > 0 && (
                <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-green-500/30">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-400 mb-1">URL Encurtada:</p>
                            <p className="text-blue-400 font-mono text-lg truncate">{shortenedUrls[0].shortened}</p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(shortenedUrls[0].shortened, shortenedUrls[0].id)}
                            className="ml-4 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center space-x-2"
                        >
                            <Copy className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                {copiedId === shortenedUrls[0].id ? "Copiado!" : "Copiar"}
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShortnedUrlResult;