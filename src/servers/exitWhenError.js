export default () => {
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.addStatusHandler((status) => {
      if (status === 'abort') {
        setTimeout(() => process.exit(0));
      }
    });
  }
};
