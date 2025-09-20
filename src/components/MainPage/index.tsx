"use client"

import BackgroundEffects from "../BackgroundEffects";
import Header from "../Header";
import History from "../History";
import ShortnedUrlResult from "../ShortnedUrlResult";
import UrlInput from "../UrlInput";
import useShortenerController from "./useShortenerController";

const UrlShortener = () => {
    const {
        errorMessage,
        isShortening,
        shortenUrl,
        setUrl,
        url,
        copiedId,
        shortenedUrls,
        copyToClipboard,
        clearHistory,
        deleteUrl,
        showHistory,
        setShowHistory,
    } = useShortenerController();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">

            <BackgroundEffects />

            <div className="relative z-10 container mx-auto px-4 py-8">
                <Header errorMessage={errorMessage} />

                <div className="max-w-2xl mx-auto">

                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/20 p-8">
                        <UrlInput
                            isShortening={isShortening}
                            shortenUrl={shortenUrl}
                            setUrl={setUrl}
                            url={url}
                        />

                        <ShortnedUrlResult
                            copiedId={copiedId}
                            shortenedUrls={shortenedUrls}
                            copyToClipboard={copyToClipboard}
                        />
                    </div>

                    <History
                        clearHistory={clearHistory}
                        copyToClipboard={copyToClipboard}
                        deleteUrl={deleteUrl}
                        shortenedUrls={shortenedUrls}
                        showHistory={showHistory}
                        setShowHistory={setShowHistory}
                    />
                </div>
            </div>
        </div>
    );
};

export default UrlShortener;
