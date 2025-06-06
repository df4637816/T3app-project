'use client';

import { useState, useDeferredValue } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value === "") {
      router.push("/"); // 輸入清空時回首頁
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deferredQuery.trim()) return;
    const params = new URLSearchParams();
    params.set('q', deferredQuery.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="🔍 搜尋照片、地點、標籤..."
        className="w-full px-5 py-3 pl-12 bg-white/20 border border-white/30 rounded-2xl shadow-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all duration-200 backdrop-blur-md"
        style={{ fontSize: '1.1rem', letterSpacing: '0.02em' }}
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300/80">
        <Search className="w-5 h-5" />
      </span>
    </form>
  );
}