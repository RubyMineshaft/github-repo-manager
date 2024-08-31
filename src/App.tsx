import React, { useState, useEffect } from 'react';
import TokenInput from './components/TokenInput';
import RepoList from './components/RepoList';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('githubToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleTokenSet = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <div>
      {!token ? (
        <TokenInput onTokenSet={handleTokenSet} />
      ) : (
        <RepoList token={token} />
      )}
    </div>
  );
};

export default App;
