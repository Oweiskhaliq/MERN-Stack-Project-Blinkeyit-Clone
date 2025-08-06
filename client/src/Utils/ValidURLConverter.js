export const ValidURLConverter = (name) => {
  return name
    .toString()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll(".", "-")
    .replaceAll("&", "");
};
