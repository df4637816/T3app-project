'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // 使用 URLSearchParams 來正確編碼查詢參數
    const params = new URLSearchParams();
    params.set('q', query.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋照片..."
        className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg 
                   text-white placeholder-white/50 focus:outline-none focus:ring-2 
                   focus:ring-white/30 focus:border-transparent"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
    </form>
  );
}