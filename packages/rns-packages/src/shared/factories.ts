export const nameofFactory = <T>() => (name: keyof T): keyof T => name;
