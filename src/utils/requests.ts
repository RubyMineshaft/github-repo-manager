// src/apiClient.ts
import { UpdateRepoPayload } from "../types";

const BASE_URL = "https://api.github.com";

export const get = async <T>(url: string, token: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;
};

export const patch = async <T>(
  url: string,
  body: UpdateRepoPayload,
  token: string
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;
};

export const del = async (url: string, token: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
};
