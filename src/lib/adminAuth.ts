import { NextRequest } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './auth/admin';
import { AdminRole } from '@/types';

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    id: string;
    email: string;
    role: AdminRole;
  };
}

/**
 * Middleware to verify admin authentication
 */
export function verifyAdminAuth(req: NextRequest): {
  authenticated: boolean;
  admin?: { id: string; email: string; role: AdminRole };
  error?: string;
} {
  const authHeader = req.headers.get('Authorization');
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return { authenticated: false, error: 'No token provided' };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return { authenticated: false, error: 'Invalid or expired token' };
  }

  return {
    authenticated: true,
    admin: {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role as AdminRole,
    },
  };
}

/**
 * Check if admin has required role
 */
export function hasRole(
  adminRole: AdminRole,
  requiredRoles: AdminRole[]
): boolean {
  return requiredRoles.includes(adminRole);
}

/**
 * Role hierarchy for permission checks
 */
export const roleHierarchy: Record<AdminRole, number> = {
  SUPER_ADMIN: 3,
  ADMIN: 2,
  EDITOR: 1,
};

/**
 * Check if admin has minimum role level
 */
export function hasMinimumRole(
  adminRole: AdminRole,
  minimumRole: AdminRole
): boolean {
  return roleHierarchy[adminRole] >= roleHierarchy[minimumRole];
}
