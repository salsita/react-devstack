import { Helmet } from 'react-helmet';

export default (jsBundleName, cssBundleName) => (content, state) => {
  const helmet = Helmet.renderStatic();

  return `
    <!doctype html>
      <html ${helmet.htmlAttributes.toString()}>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${cssBundleName ? `
        <link href="/${cssBundleName}" media="all" rel="stylesheet" />
        ` : ''}
        ${state !== undefined ? `
          <script type="text/javascript">
            window.reduxState = ${JSON.stringify(state)};
          </script>
        ` : ''}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${content}</div>
        <script src="/${jsBundleName}"></script>
      </body>
    </html>
  `;
};
