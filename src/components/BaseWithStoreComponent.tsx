import store from '@/redux/store';
import BaseComponent from './BaseComponent';

class BaseWithStoreComponent<P = {}, S = {}, SS = any> extends BaseComponent<
  P,
  S,
  SS
> {
  unsubscribe: any;

  componentDidMount() {
    if (super.componentDidMount != undefined) {
      super.componentDidMount();
    }
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
    if (super.componentWillUnmount != undefined) {
      super.componentWillUnmount();
    }
  }
}

export default BaseWithStoreComponent;
