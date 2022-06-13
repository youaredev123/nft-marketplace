import * as React from 'react';
import isEqual from 'react-fast-compare';

export function withMemo(Component) {
  const memoizedComponent = props => <Component {...props} />;
  memoizedComponent.displayName = 'withMemo';

  return React.memo(memoizedComponent, ((prevProps, nextProps) => isEqual(prevProps, nextProps)));
}
