export default () => {
  if (module.hot) {
    module.hot.addStatusHandler(status => {
      if (status === 'abort') {
        setTimeout(() => process.exit(0));
      }
    });
  }
};
