import htmlTemplate from '../htmlTemplate';

const nullStateProvider = () => null;

export default (server, provider) => {
  server.get('*', (req, res) => {
    const {
      content,
      state
    } = provider();

    res.send(htmlTemplate(content, state));
  });
};
