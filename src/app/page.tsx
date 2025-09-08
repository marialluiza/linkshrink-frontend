"use client";

import React, { useState } from "react";
import { Copy, Link, Zap, History, ExternalLink, Trash2 } from "lucide-react";
import BackgroundEffects from "@/components/BackgroundEffects";

interface ShortenedUrl {
  id: string;
  original: string;
  shortened: string;
  createdAt: string;
  clicks: number;
}

const API_BASE = "https://url-shortener-api-aeqm.onrender.com";

const ChidoriUrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [isShortening, setIsShortening] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">

      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
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

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500/30 rounded-lg text-red-300 max-w-md mx-auto">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/20 p-8">
            {/* URL Input */}
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
                      <span>Jutsu em andamento...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Ativar Chidori</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Latest shortened URL */}
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

          {/* History Toggle */}
          {shortenedUrls.length > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <History className="w-5 h-5" />
                <span>{showHistory ? "Ocultar Histórico" : `Ver Histórico (${shortenedUrls.length})`}</span>
              </button>
            </div>
          )}

          {/* History Panel */}
          {showHistory && shortenedUrls.length > 0 && (
            <div className="mt-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <History className="w-5 h-5 mr-2 text-blue-400" />
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
      </div>
    </div>
  );
};

export default ChidoriUrlShortener;
