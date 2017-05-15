export default bundleName => (content, state) => `
  <html>
    <head>
      <title>react-universal-app-generator</title>
      ${state !== undefined ? `
        <script type="text/javascript">
          window.reduxState = ${JSON.stringify(state)};
        </script>
      ` : ''}
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/${bundleName}"></script>
    </body>
  </html>
`;
