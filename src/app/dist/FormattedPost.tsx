'use client'

import { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import "highlight.js/styles/ir-black.css";
import  hljsLanguages from '@/app/lib/hljs-langs';

interface FormattedPostProps {
  children: React.ReactNode;
}
    
    const copyIcon = `<div class="text-sm items-center flex">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
</svg>  </div>
          `
     const copiedIcon =  `<div class="text-sm items-center flex">  
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
 class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
</svg>
  </div> `


const FormattedPost: React.FC<FormattedPostProps> = ({ children },) => {

  useEffect(() => {
  for (const lang in hljsLanguages) {
      if (Object.prototype.hasOwnProperty.call(hljsLanguages, lang)) {
        hljs.registerLanguage(lang, hljsLanguages[lang]);
      }
    }

    const codeBlocks = document.querySelectorAll("code");
    codeBlocks.forEach((code) => {
      hljs.highlightElement(code as HTMLElement);
      
    });

  }, []);


  useEffect(() => {
    // Find all pre code blocks and highlight them
    const preBlocks = document.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
       const Code =pre.querySelector("code");
       if (Code) {
   
          const languageClass = Array.from(Code.classList).find((cls) => cls.startsWith("language-"));
          let language = languageClass ? languageClass.replace("language-", "") : "";
          if (language === "undefined") {
          language = "command";
          }
          // Create a top-bar for each code block
          const topBar = document.createElement("div");
          topBar.className = "bg-neutral-900 text-xs relative rounded-b-none -mb-10 text-neutral-400 rounded px-2 py-1 flex items-center justify-between  w-full";
          topBar.innerHTML = `<div class="px-1 bg-neutral-800 text-neutral-400 rounded">${language}</div>`


         // Create a copy to clipboard button
          const copyButton = document.createElement("button");
          copyButton.className = "text-sm  text-neutral-300 py-1 bg-neutral-800 hover:opacity-80 px-2 rounded";
    
         copyButton.innerHTML = copyIcon
          copyButton.addEventListener("click", () => {
            copyToClipboard(pre.textContent || "");
            copyButton.innerHTML = copiedIcon
            setTimeout(() => copyButton.innerHTML = copyIcon, 1000);
          });
          topBar.appendChild(copyButton);
          pre.parentNode?.insertBefore(topBar, pre);
   }
    })
    
    
  }, []);
  
  
  const copyToClipboard = (text: string) => {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
  };

  return (
    <div
      className={`prose prose-neutral prose-p:text-neutral-500 prose-ol:text-neutral-500
            prose-ul:text-neutral-500 prose-headings:text-neutral-500 prose-li:text-neutral-500
            prose-code:text-neutral-500 prose-a:text-neutral-500 prose-strong:text-neutral-500
            prose-pre:bg-black prose-hr:border-neutral-800 prose-pre:whitespace-pre-wrap  
             `}
            
    >
      {children}
    </div>
  );
};

export default FormattedPost;



