'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/types';

const ADMIN_TOKEN_KEY = 'admin_token';

export function useAdminApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = (): HeadersInit => {
    const token = Cookies.get(ADMIN_TOKEN_KEY);
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const request = async <T,>(
    url: string,
    options?: RequestInit
  ): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options?.headers,
        },
      });

      const data: ApiResponse<T> = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Request failed');
      }

      setLoading(false);
      return data.data as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const get = async <T,>(url: string): Promise<T> => {
    return request<T>(url, { method: 'GET' });
  };

  const post = async <T,>(url: string, body?: any): Promise<T> => {
    return request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  const put = async <T,>(url: string, body?: any): Promise<T> => {
    return request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  };

  const patch = async <T,>(url: string, body?: any): Promise<T> => {
    return request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  };

  const del = async <T,>(url: string): Promise<T> => {
    return request<T>(url, { method: 'DELETE' });
  };

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    del,
    request,
  };
}
