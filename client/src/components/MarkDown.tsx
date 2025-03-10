import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import '../App.css'
import prism from "prismjs"
import 'prismjs/themes/prism-tomorrow.css'; // You can choose other themes too
import 'prismjs/components/prism-javascript';
import { useEffect } from "react";


function MarkDown({ message}: { message: string }) {
  useEffect(() => {
    prism.highlightAll();
}, [message]);

  return (
    <div className="markdown">
      <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
    </div>
  )
}

export default MarkDown

