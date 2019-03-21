import Loadable from 'react-loadable';
import Loading from 'Loading';

const Agile = Loadable({
  loader: () => import('./Agile'),
  loading: Loading,
});
export default Agile;
