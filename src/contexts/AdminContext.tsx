'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Admin, ApiResponse, AdminLoginResponse } from '@/types';

interface AdminContextType {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchAdminInfo: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = 'admin_token';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch admin info from token
  const fetchAdminInfo = async () => {
    const savedToken = Cookies.get(ADMIN_TOKEN_KEY);
    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/auth/me', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin info');
      }

      const data: ApiResponse<Admin> = await response.json();
      if (data.success && data.data) {
        setAdmin(data.data);
        setToken(savedToken);
      } else {
        // Token is invalid
        Cookies.remove(ADMIN_TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error fetching admin info:', error);
      Cookies.remove(ADMIN_TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiResponse<AdminLoginResponse> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Login failed');
    }

    const { admin: adminData, token: tokenData } = data.data;
    setAdmin(adminData);
    setToken(tokenData);
    Cookies.set(ADMIN_TOKEN_KEY, tokenData, { expires: 7 }); // 7 days
    router.push('/admin');
  };

  // Logout function
  const logout = () => {
    setAdmin(null);
    setToken(null);
    Cookies.remove(ADMIN_TOKEN_KEY);
    router.push('/admin/login');
  };

  // Check auth on mount
  useEffect(() => {
    fetchAdminInfo();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        loading,
        login,
        logout,
        fetchAdminInfo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
