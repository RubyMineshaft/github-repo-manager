import React, { useEffect, useState } from 'react';
import { get, patch, del } from '../utils/requests';
import { Repo, UpdateRepoPayload } from '../types';

interface RepoListProps {
  token: string;
}

const RepoList: React.FC<RepoListProps> = ({ token }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [perPage, setPerPage] = useState<string>("100");
  const [pageNumber, setPageNumber] = useState<string>("1");
  const [allSelected, setAllSelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await get<Repo[]>(`/user/repos?per_page=${perPage}&page=${pageNumber}`, token);
        setRepos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepos();
  }, [token, perPage, pageNumber]);

  const handleSelect = (repoName: string) => {
    setSelectedRepos((prevSelected) =>
      prevSelected.includes(repoName)
        ? prevSelected.filter((name) => name !== repoName)
        : [...prevSelected, repoName]
    );
  };

  const handleBulkAction = async (action: 'set-private' | 'set-public' | 'archive' | 'delete') => {
    try {
      const requests = selectedRepos.map((repoName) => {
        const payload: UpdateRepoPayload = {};

        switch (action) {
          case 'set-private':
            payload.private = true;
            return patch<Repo>(`/repos/RubyMineshaft/${repoName}`, payload, token);
          case 'set-public':
            payload.private = false;
            return patch<Repo>(`/repos/RubyMineshaft/${repoName}`, payload, token);
          case 'archive':
            payload.archived = true;
            return patch<Repo>(`/repos/RubyMineshaft/${repoName}`, payload, token);
          case 'delete':
            return del(`/repos/RubyMineshaft/${repoName}`, token);
          default:
            return Promise.resolve();
        }
      });

      await Promise.all(requests);
      setSelectedRepos([]);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleAll = () => {
    if (allSelected) {
        setSelectedRepos([]);
        setAllSelected(false);
    } else {
        const toSelect = [];
        for (const repository of repos) {
            toSelect.push(repository.name);
        }
        setSelectedRepos(toSelect);
        setAllSelected(true);
    }   
  }

  const selectLabs = () => {
    const selected = [];
    for (const repo of repos) {
        if (repo.name.includes("-000")) {
            selected.push(repo.name);
        }
    }
    setSelectedRepos(selected);
  }

  return (
    <div>
      <h2>Repository List</h2>
      <div>
        <label htmlFor="perPage">Repos per page: </label> <input type="number" id="perPage" value={perPage} onChange={e => setPerPage(e.target.value)} />
        <br />
        <label htmlFor="pageNo">Page: </label> <input type="number" id="pageNo" value={pageNumber} onChange={e => setPageNumber(e.target.value)} />
      </div>
      <button onClick={() => handleBulkAction('set-private')}>Set Private</button>
      <button onClick={() => handleBulkAction('set-public')}>Set Public</button>
      <button onClick={() => handleBulkAction('archive')}>Archive</button>
      <button onClick={() => handleBulkAction('delete')}>Delete</button>
      <button onClick={() => handleToggleAll()}>ALL</button>
      <button onClick={() => selectLabs()}>Labs</button>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <input
              type="checkbox"
              onChange={() => handleSelect(repo.name)}
              checked={selectedRepos.includes(repo.name)}
            />
            {repo.name}
            <span className={repo.private ? "private" : "public"}>{repo.private ? "PRIVATE" : "PUBLIC"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
