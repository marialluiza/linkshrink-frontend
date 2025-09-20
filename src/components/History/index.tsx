import { Copy, ExternalLink, HistoryIcon, Trash2 } from "lucide-react"
import Toggle from "./Toggle";
import { Dispatch, SetStateAction } from "react";

interface HistoryProps {
    shortenedUrls: {
        id: string;
        original: string;
        shortened: string;
        createdAt: string;
    }[];
    showHistory: boolean;
    deleteUrl: (id: string) => void;
    clearHistory: () => void;
    copyToClipboard: (text: string, id: string) => void;
    setShowHistory: Dispatch<SetStateAction<boolean>>;
}

const History: React.FC<HistoryProps> = ({
    shortenedUrls,
    showHistory,
    deleteUrl,
    clearHistory,
    copyToClipboard,
    setShowHistory
}) => {

    return (
        <div>
            <Toggle
                setShowHistory={setShowHistory}
                showHistory={showHistory}
                shortenedUrls={shortenedUrls}
            />

            {showHistory && shortenedUrls.length > 0 && (
                <div className="mt-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white flex items-center">
                            <HistoryIcon className="w-5 h-5 mr-2 text-blue-400" />
                            Histórico de Links
                        </h3>
                        {shortenedUrls.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="text-red-400 hover:text-red-300 text-sm flex items-center space-x-1"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Limpar Tudo</span>
                            </button>
                        )}
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {shortenedUrls.map((item) => (
                            <div key={item.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Original:</p>
                                            <p className="text-gray-300 text-sm truncate">{item.original}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Encurtado:</p>
                                            <p className="text-blue-400 font-mono text-sm">{item.shortened}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">Criado em: {item.createdAt}</p>
                                    </div>

                                    <div className="ml-4 flex space-x-2">
                                        <button
                                            onClick={() => copyToClipboard(item.shortened, item.id)}
                                            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                                            title="Copiar"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => window.open(item.original, "_blank")}
                                            className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                                            title="Abrir original"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteUrl(item.id)}
                                            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default History;