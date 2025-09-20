import { Link, Zap } from "lucide-react"
import { Dispatch, SetStateAction } from "react";

interface UrlInputProps {
    url: string;
    setUrl: Dispatch<SetStateAction<string>>;
    shortenUrl: () => void;
    isShortening: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({
    url,
    setUrl,
    shortenUrl,
    isShortening
}) => {

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-4">
                <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Cole sua URL aqui para encurtar..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
                        onKeyPress={(e) => e.key === "Enter" && shortenUrl()}
                    />
                </div>

                <button
                    onClick={shortenUrl}
                    disabled={isShortening || !url.trim()}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {isShortening ? (
                        <>
                            <Zap className="w-5 h-5 animate-spin" />
                            <span>Em andamento...</span>
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5" />
                            <span>Encurtar</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default UrlInput;