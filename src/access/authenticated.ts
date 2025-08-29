// authenticated.ts
import type { AccessArgs } from 'payload';

type authenticatedArgs = AccessArgs & {
  roles?: ('admin' | 'editor' | 'user')[];
};

export const authenticated = ({ req, roles }: authenticatedArgs): boolean => {
  if (req.user) {
    if (roles) {
      return roles.some(role => req.user?.roles?.includes(role));
    }
    return true;
  }

  return false; // Explicitly return false instead of undefined
};