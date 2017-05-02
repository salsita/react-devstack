export default (scriptSrc, content) => `
  <html>
    <head>
      <title>react-universal-app-generator</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="${scriptSrc}"></script>
    </body>
  </html>
`;
