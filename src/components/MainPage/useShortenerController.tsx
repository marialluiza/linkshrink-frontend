import { ShortenedUrl } from "@/interfaces/ShortenedUrl";
import { useEffect, useState } from "react";

const API_BASE = "https://url-shortener-api-aeqm.onrender.com";
const STORAGE_KEY = "chidori_url_history";

const useShortenerController = () => {

    const [url, setUrl] = useState("");
    const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
    const [isShortening, setIsShortening] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem(STORAGE_KEY);
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                setShortenedUrls(parsedHistory);
            }
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(shortenedUrls));
        } catch (error) {
            console.error("Erro ao salvar histórico:", error);
        }
    }, [shortenedUrls]);

    const shortenUrl = async () => {
        if (!url.trim()) return;
        setIsShortening(true);
        setErrorMessage("");

        try {
            const response = await fetch(`${API_BASE}/encurtar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ original_url: url }),
            });

            if (!response.ok) {
                throw new Error("Erro ao encurtar a URL");
            }

            const data = await response.json();
            console.log("Resposta da API:", data);

            const newUrl: ShortenedUrl = {
                id: Date.now().toString(),
                original: url,
                shortened: data.short_url,
                createdAt: new Date().toLocaleString(),
                clicks: 0,
            };

            console.log("URL encurtada com sucesso:", newUrl);

            setShortenedUrls((prev) => [newUrl, ...prev]);
            setUrl("");
        } catch (err: unknown) {
            setErrorMessage(
                typeof err === "object" && err !== null && "message" in err
                    ? String((err as { message?: unknown }).message)
                    : "Erro inesperado"
            );
        } finally {
            setIsShortening(false);
        }
    };

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            setErrorMessage("Erro ao copiar para área de transferência");
        }
    };

    const deleteUrl = (id: string) => {
        setShortenedUrls((prev) => prev.filter((item) => item.id !== id));
    };

    const clearHistory = () => {
        setShortenedUrls([]);
    };

    return {
        errorMessage,
        isShortening,
        url,
        setUrl,
        shortenedUrls,
        copiedId,
        showHistory,
        setShowHistory,
        shortenUrl,
        copyToClipboard,
        deleteUrl,
        clearHistory,
    };
}

export default useShortenerController;
