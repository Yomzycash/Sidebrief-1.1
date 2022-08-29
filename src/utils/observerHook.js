const useObserver = (element, handleFunction) => {
  if (element) {
    return new Promise((resolve, reject) => {
      resolve(handleFunction());
    });
  } else {
    const observer = new MutationObserver(() => {
      if (element) {
        observer.disconnect();
        return new Promise((resolve, reject) => {
          resolve(handleFunction());
        });
      }
    });
    observer.observe(document, { subtree: true, childList: true });
  }
};
export default useObserver;
