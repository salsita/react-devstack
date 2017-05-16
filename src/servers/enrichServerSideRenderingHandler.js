const NOT_FOUND_CODE = 404;
const OK_CODE = 200;
const ERROR_CODE = 500;

export default (server, provider, templateProvider) => {
  server.get('*', (req, res) => {
    provider(req.originalUrl)
      .then(({ content, state, found }) => {
        res
          .status(found ? OK_CODE : NOT_FOUND_CODE)
          .send(templateProvider(content, state));
      })
      .catch((error) => {
        console.error(error);

        res
          .status(ERROR_CODE)
          .send(error.message);
      });
  });
};
