export function split_path(path_str:string) {
  return path_str.split('/').filter((x) => x.length > 0);
}
