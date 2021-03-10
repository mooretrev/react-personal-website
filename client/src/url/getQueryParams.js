import qs from 'qs';

export default async function getQueryParams(history) {
  const queryString = history.location.search.replace('?', '');
  return qs.parse(queryString);
}
