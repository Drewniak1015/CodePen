import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { IoLogoCss3 } from "react-icons/io";
import { RiJavascriptFill } from "react-icons/ri";
import { MdCloseFullscreen } from "react-icons/md";
import IframeContent from "./Components/IframeContent";
interface StorageData {
  HTML: string;
  CSS: string;
  JAVASCRIPT: string;
}
const CodeEditor = ({ title, icon, language, value, onChange }: any) => (
  <div className="h-[17rem] w-[31%] flex flex-col bg-[#080404] border-[#2f2f2f] border-[1px] relative">
    <div className="flex h-[12%] justify-between items-center">
      <div className="bg-[#1e1e1e] w-[6.5rem] h-[100%] border-[#2f2f2f] border-t-2">
        <p className="flex items-center justify-center h-[100%] w-[100%] text-xl font-bold text-[#aaaebc] gap-2">
          {icon}
          {title}
        </p>
      </div>
      {/* moze dorobic diva aby lepiej wygladalo */}
      <MdCloseFullscreen className="fill-white mr-4 text-lg cursor-pointer h-[100%]"></MdCloseFullscreen>
    </div>
    <Editor
      width="100%"
      height="88%"
      defaultLanguage={language}
      theme="vs-dark"
      value={value}
      onChange={onChange}
    />
  </div>
);

const App = () => {
  const [HTML, setHTML] = useState<string>("");
  const [CSS, setCSS] = useState<string>("");
  const [JAVASCRIPT, setJAVASCRIPT] = useState<string>("");

  let item = localStorage.getItem("code");

  useEffect(() => {
    const code = {
      HTML,
      CSS,
      JAVASCRIPT,
    };
    localStorage.setItem("code", JSON.stringify(code));
  }, [HTML, CSS, JAVASCRIPT]);

  useEffect(() => {
    if (item !== null) {
      let ParsedItem: StorageData = JSON.parse(item);
      console.log(ParsedItem);
      setHTML(ParsedItem.HTML);
      setCSS(ParsedItem.CSS);
      setJAVASCRIPT(ParsedItem.JAVASCRIPT);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center gap-4 w-[100vw] h-[20rem] bg-gradient-to-bl from-[#080404] via-[#1e1e1e] to-[#121212] pt-6">
        <CodeEditor
          title="HTML"
          icon={<HiCodeBracketSquare className="fill-red-500" />}
          language="html"
          value={HTML}
          onChange={(value: string) => setHTML(value || "")}
        />
        <CodeEditor
          title="CSS"
          icon={<IoLogoCss3 className="fill-blue-500" />}
          language="css"
          value={CSS}
          onChange={(value: string) => setCSS(value || "")}
        />
        <CodeEditor
          title="JS"
          icon={<RiJavascriptFill className="fill-yellow-400" />}
          language="javascript"
          value={JAVASCRIPT}
          onChange={(value: string) => setJAVASCRIPT(value || "")}
        />
      </div>
      <div className="h-[100%]">
        <IframeContent HTML={HTML} CSS={CSS} JAVASCRIPT={JAVASCRIPT} />
      </div>
    </>
  );
};

export default App;
// zrobic localstrogae jutro
// responsywnosc oraz minimalizowanie okienek
