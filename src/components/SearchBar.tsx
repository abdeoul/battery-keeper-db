
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search batteries..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative animate-slide-up">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-4 rounded-lg border border-border bg-card/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <button 
          type="submit" 
          className="absolute right-2 top-2 btn-secondary h-8 px-3 py-1"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
