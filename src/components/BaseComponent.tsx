import React from 'react';

class BaseComponent<P = {}, S = {}, SS = any> extends React.Component<
  P,
  S,
  SS
> {
  unmount: boolean | undefined;

  componentDidMount() {
    if (super.componentDidMount != undefined) {
      super.componentDidMount();
    }
    this.unmount = false;
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  setState<K extends keyof S>(
    state:
      | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
      | (Pick<S, K> | S | null),
    callback?: () => void,
  ) {
    if (this.unmount == true) return;
    super.setState(state, callback);
  }
}

export default BaseComponent;
