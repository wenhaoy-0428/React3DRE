export function split_path(path_str: string) {
  return path_str.split('/').filter((x) => x.length > 0);
}

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
