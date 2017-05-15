const nullStateProvider = () => null;

export default (server, provider, templateProvider) => {
  server.get('*', (req, res) => {
    const {
      content,
      state
    } = provider();

    res.send(templateProvider(content, state));
  });
};
