export default function cacheChannel(store, subscription) {
  if(subscription) {
    store.find('channel', subscription.id);
  }
}
