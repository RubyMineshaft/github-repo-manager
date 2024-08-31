import React, { useState } from 'react';

interface TokenInputProps {
  onTokenSet: (token: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ onTokenSet }) => {
  const [token, setToken] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleSaveToken = () => {
    localStorage.setItem('githubToken', token);
    onTokenSet(token);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter your GitHub Personal Access Token" 
        value={token}
        onChange={handleInputChange}
      />
      <button onClick={handleSaveToken}>Save Token</button>
    </div>
  );
};

export default TokenInput;
