export interface Repo {
  id: number;
  name: string;
  private: boolean;
  archived: boolean;
  [key: string]: unknown;
}

export interface UpdateRepoPayload {
  private?: boolean;
  archived?: boolean;
}
