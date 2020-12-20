import tdAPI from 'td_ameritrade_api';

export default async function closePositions() {
  const currentPositions = await tdAPI.getCurrentPositionsPromise();

}
