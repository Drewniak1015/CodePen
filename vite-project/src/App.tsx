import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { IoLogoCss3 } from "react-icons/io";
import { RiJavascriptFill } from "react-icons/ri";
import { MdCloseFullscreen } from "react-icons/md";
import { IoIosCopy } from "react-icons/io";
import IframeContent from "./Components/IframeContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Styl dla toasts
interface StorageData {
  HTML: string;
  CSS: string;
  JAVASCRIPT: string;
}
const notify = (language: string) => {
  toast.success(`Udało się skopiować ${language.toUpperCase()}!`);
};

const CodeEditor = ({ id, title, icon, language, value, onChange }: any) => (
  <div
    className="h-[17rem] flex flex-col flex-1 basis-0 bg-[#080404] border-[#2f2f2f] border-[1px] overflow-auto"
    id={id}
  >
    <div className="flex h-[12%] justify-between items-center">
      <div className="bg-[#1e1e1e] w-[6.5rem] h-[100%] border-[#2f2f2f] border-t-2">
        <p className="flex items-center justify-center h-[100%] w-[100%] text-xl font-bold text-[#aaaebc] gap-2 select-none ">
          {icon}
          {title}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <IoIosCopy
          className="fill-white cursor-pointer hover:scale-110 duration-200"
          onClick={() => {
            navigator.clipboard.writeText(value);
            notify(language);
          }}
        ></IoIosCopy>
        <MdCloseFullscreen
          className="fill-white mr-4 text-lg cursor-pointer h-[100%] hover:scale-110 duration-200"
          onClick={() => {
            const box = document.getElementById(id) as HTMLDivElement;
            box.style.flexGrow = box.style.flexGrow === "4" ? "1" : "4";
          }}
        ></MdCloseFullscreen>
      </div>
    </div>{" "}
    <Editor
      className="overflow-hidden"
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
      setHTML(ParsedItem.HTML);
      setCSS(ParsedItem.CSS);
      setJAVASCRIPT(ParsedItem.JAVASCRIPT);
    }
  }, []);

  return (
    <>
      {" "}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex gap-4 px-4 w-[100vw] h-[20rem] bg-gradient-to-bl from-[#080404] via-[#1e1e1e] to-[#121212] pt-6 ">
        <CodeEditor
          id="Editor0"
          title="HTML"
          icon={<HiCodeBracketSquare className="fill-red-500" />}
          language="html"
          value={HTML}
          onChange={(value: string) => setHTML(value || "")}
        />
        <CodeEditor
          id="Editor1"
          title="CSS"
          icon={<IoLogoCss3 className="fill-blue-500" />}
          language="css"
          value={CSS}
          onChange={(value: string) => setCSS(value || "")}
        />
        <CodeEditor
          id="Editor2"
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
//dodac responsywnosc oraz resizwolnosc glownych divow
