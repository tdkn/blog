import { Logo } from "~/components/ui";

export interface Props {
  font: string;
  title: string;
}

const OpenGraphTemplate = (props: Props) => {
  const getCss = (font: string) => `
    @font-face {
      font-family: 'M PLUS Rounded 1c';
      font-weight: bold;
      src: url(data:font/ttf;charset=utf-8;base64,${font}) format('truetype');
    }
    html,
    body {
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 1200px;
      height: 630px;
      display: flex;
      position: relative;
      align-items: center;
      font-family: 'M PLUS Rounded 1c';
      font-weight: bold;
      justify-content: center;
    }
    .title {
      font-size: 50px;
      padding-left: 80px;
      padding-right: 80px;
    }
    .author {
      right: 0;
      bottom: 0;
      margin: 50px;
      position: absolute;
      font-size: 40px;
      font-weight: 700;
    }
  `;

  return (
    <html>
      <style dangerouslySetInnerHTML={{ __html: getCss(props.font) }} />
      <body>
        <div className="wrapper">
          <Logo height={64} top={0} left={0} position="absolute" margin="50" />
          <div className="title">{props.title}</div>
          <div className="author">@tdkn_</div>
        </div>
      </body>
    </html>
  );
};

export default OpenGraphTemplate;
