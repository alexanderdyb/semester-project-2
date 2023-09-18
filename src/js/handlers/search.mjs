export function searchListings(data, query) {
  return data.filter((element) => {
    if (query) {
      return element.title.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });
}
