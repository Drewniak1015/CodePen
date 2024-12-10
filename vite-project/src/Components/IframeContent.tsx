import "highlight.js/styles/monokai-sublime.css";
interface IframeContentProps {
  HTML: string;
  CSS: string;
  JAVASCRIPT: string;
}
const IframeContent: React.FC<IframeContentProps> = ({
  HTML,
  CSS,
  JAVASCRIPT,
}) => {
  const iframeContent = `
<html lang="en">
  <body>${HTML}</body>
  <style>${CSS}</style>
  <script>${JAVASCRIPT}</script>
</html>


`;
  return (
    <div>
      <iframe
        srcDoc={iframeContent}
        className="h-[calc(100vh-20rem)] w-[100vw]"
      ></iframe>
    </div>
  );
};

export default IframeContent;
