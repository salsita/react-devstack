export default (jsBundleName, cssBundleName) => (content, state) => `
  <html>
    <head>
      <title>react-devstack</title>
      ${cssBundleName ? `
      <link href="/${cssBundleName}" media="all" rel="stylesheet" />
      ` : ''}
      ${state !== undefined ? `
        <script type="text/javascript">
          window.reduxState = ${JSON.stringify(state)};
        </script>
      ` : ''}
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/${jsBundleName}"></script>
    </body>
  </html>
`;
