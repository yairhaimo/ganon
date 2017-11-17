import { AsyncStorage } from 'react-native';
const NAMESPACE = '@Ganon';

export function set(key, value) {
  return AsyncStorage.setItem(`${NAMESPACE}:${key}`, value);
}

export function get(key) {
  return AsyncStorage.getItem(`${NAMESPACE}:${key}`);
}

export function remove(key) {
  return AsyncStorage.removeItem(`${NAMESPACE}:${key}`);
}
