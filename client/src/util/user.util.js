// Utility helpers for serializing user objects safely.

export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

export const sanitizeUsers = (users) => {
  return users.map(sanitizeUser);
};
