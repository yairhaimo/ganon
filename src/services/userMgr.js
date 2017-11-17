import * as storage from './storage';

const USER_KEY = 'user';

export async function getUser() {
  const user = await storage.get(USER_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function setUser(user) {
  return storage.set(USER_KEY, JSON.stringify(user));
}

export async function removeUser() {
  await storage.remove(USER_KEY);
  const user = await getUser();
  console.log('removed user', user);
}
