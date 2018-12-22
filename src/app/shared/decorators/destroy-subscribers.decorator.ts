// @see https://medium.com/@2muchcoffee/how-to-avoid-multiple-subscription-in-angular-2-component-ce50bc21991b
import {Subscriber} from 'rxjs/Subscriber';

export function DestroySubscribers() {
  return function (target: any) {
    target.prototype.ngOnDestroy = ngOnDestroyDecorator(target.prototype.ngOnDestroy);
    function ngOnDestroyDecorator(f) {
      return function () {
        const superData = f ? f.apply(this, arguments) : null;
        for (const subscriberKey in this.subscribers) {
          if (this.subscribers.hasOwnProperty(subscriberKey)) {
            const subscriber = this.subscribers[subscriberKey];
            if (subscriber instanceof Subscriber) {
              subscriber.unsubscribe();
            }
          }
        }
        return superData;
      };
    }
    return target;
  };
}
