import React from 'react';
// This component is currently superseded by the inline input in App.tsx 
// to handle both filtering and generation triggers effectively.
// Keeping it as a placeholder or for potential future specialized search UI.

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = () => {
  return null;
};
