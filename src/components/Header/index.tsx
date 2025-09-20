import { Zap } from "lucide-react"

interface HeaderProps {
    errorMessage?: string;
}

const Header: React.FC<HeaderProps> = ({ errorMessage }) => {

    return (
        <div className="text-center mb-12 mt-6">
            <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-blue-400 mr-3 animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Linkshrink
                </h1>
                <Zap className="w-8 h-8 text-purple-400 ml-3 animate-pulse delay-500" />
            </div>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Encurtador de links simples e rápido.
                <br />
            </p>

            {errorMessage && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-500/30 rounded-lg text-red-300 max-w-md mx-auto">
                    {errorMessage}
                </div>
            )}
        </div>
    )
}

export default Header;