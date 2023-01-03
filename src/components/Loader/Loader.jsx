import styles from './Loader.module.css';

import { InfinitySpin } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className={styles.loaderSpam}>
      <InfinitySpin width="200" color="white" />
    </div>
  );
};
export default Loader;
