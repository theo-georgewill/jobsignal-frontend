// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import  { Suspense } from 'react';
import Spinner from '@/pages/spinner/Spinner';


// project imports


// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable =
  <P extends object>(
    Component: React.ComponentType<P>
  ) =>
  (props: P) =>
  (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
