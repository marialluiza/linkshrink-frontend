const BackgroundEffects = () => {
    return (
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-64 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
            <div className="absolute top-40 right-20 w-48 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-300"></div>
            <div className="absolute bottom-32 left-1/4 w-56 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse delay-700"></div>
        </div>
    );
}

export default BackgroundEffects;