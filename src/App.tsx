import React, { useState, useEffect } from 'react';
import TokenInput from './components/TokenInput';

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
        <div>
          <p>Your GitHub token is set. Now you can manage your repositories.</p>
        </div>
      )}
    </div>
  );
};

export default App;
