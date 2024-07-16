# NEXT FwSH

--------

Format markdown->html post content with Syntax Highlighting using highlight.js

`{
  "name": "next-fwsh",
  "version": "0.1.0",
  "author": "Shafin",
 }
 `

```bash
git clone https://github.com/besaoct/Next-FwSH.git 
```

--------

## Features

1. Nextjs 13+, Typescript, Tailwindcss
2. Markdown -> Html -> Post with Syntax highlighting
3. Copy to Clipboard
4. Detects and shows language of the code
5. Uses Highlight.js.

--------

Greetings, fellow developers! 👋

To add syntax highlighting in a post within a Next.js application using TypeScript and Tailwind CSS, follow these steps:

### Update package.json if needed

Ensure that the necessary dependencies are installed in your Next.js project. Open the `package.json` file and make sure it includes the following dependencies:

```json
{
  "name": "next-fwsh",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tailwindcss/typography": "^0.5.9",
    "@types/highlight.js": "^10.1.0",
    "@types/node": "20.4.4",
    "@types/react": "18.2.15",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.14",
    "eslint": "8.45.0",
    "eslint-config-next": "13.4.12",
    "fs": "^0.0.1-security",
    "gray-matter": "^4.0.3",
    "next": "^13.4.12",
    "postcss": "8.4.27",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "remark": "^14.0.3",
    "remark-html": "^15.0.2",
    "tailwindcss": "3.3.3",
    "typescript": "5.1.6"
  }
}
```

### Create the Markdown Post File

Place your post content in a Markdown file named `post.md` inside the `{root directory}/public/content` folder.

`post.md`:

```md
# Markdown contents

Other contents
----
```

### Utils to Retrieve Post Data

Create a utility file named `getPost.tsx` under the `{your directory to utils}/utils/` directory. This file will handle reading the Markdown file and processing its content.

```jsx

//utils/getPost.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'public');

export async function getPostData() {
    const fullPath = path.join(postsDirectory, `post.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
     
     // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    
  
    const contentHtml = processedContent.toString();
    const PostsWithHTML: Posts & { contentHtml: string } = {
        contentHtml,
    }

    return PostsWithHTML
}
```

### FormattedPost Component

Create a React component named `FwSH.tsx` under the `{your directory to components}/compoents/` directory. This component will handle syntax highlighting using `highlight.js`.

```jsx

'use client'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/ir-black.css'

import { useEffect } from 'react';

import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import ruby from 'highlight.js/lib/languages/ruby';
import swift from 'highlight.js/lib/languages/swift';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import kotlin from 'highlight.js/lib/languages/kotlin';
import php from 'highlight.js/lib/languages/php';
import shell from 'highlight.js/lib/languages/shell';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import markdown from 'highlight.js/lib/languages/markdown';
import powershell from 'highlight.js/lib/languages/powershell';
import command from 'highlight.js/lib/languages/nginx';
import ini from 'highlight.js/lib/languages/ini';
import http from 'highlight.js/lib/languages/http';
import r from 'highlight.js/lib/languages/r';
import bash from 'highlight.js/lib/languages/bash';

const hljsLanguages: Record<string, any> = {
  command,
  javascript,
  json,
  python,
  java,
  php,
  bash,
  shell,
  typescript,
  css,
  c,
  cpp,
  ruby,
  swift,
  go,
  rust,
  kotlin,
  xml,
  yaml,
  sql,
  markdown,
  powershell,
  ini,
  http,
  r,
};

interface FwshProps {
  HTMLContent: React.ReactNode;
  defaults?: boolean;
  className?: string;

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

const FwSH: React.FC<FwshProps> = ({ HTMLContent, defaults, className}) => {

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
          topBar.className = "bg-neutral-900 text-xs rounded-b-none relative text-neutral-400 rounded px-2 py-1 flex items-center justify-between w-full";
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
      navigator.clipboard.writeText(text)
  };
  return (
    <div
      className={`m-auto w-full
      ${defaults ? `prose prose-invert prose-pre:bg-transparent 
      prose-hr:border-neutral-800 prose-pre:p-0 prose-pre:pt-2 prose-pre:-mt-2`
        :
        `${className}` 
      }
       
       `}>
      
    {HTMLContent}
    </div>
  );
};

export default FwSH;

```

### Home Page

Update the `{your directory to post file}/{your post file name}.tsx` file to use the `FwSH` component and display the processed post content.

```jsx
import FwSH from "{Path to components}/components/FwSH"
import { getPostData } from "{Path to utils}/utils/getPost"

export default async function Home() {

  const {contentHtml} = await getPostData()
  return (
    <main className="p-4 lg:p-10 w-full flex m-auto text-white  justify-center items-center "> 
      <FwSH defaults 
        HTMLContent={
           <section dangerouslySetInnerHTML={{__html:contentHtml}} />
        }
      
      /> 
 
    </main>
  )
}
```

To use other themes of highlight.js, find and change `highlight.js/styles/github-dark.css` in `FwSH.tsx` this to `highlight.js/styles/{theme name}.css`.

Default styles using `<FwSH defaults ...` contains className: `prose prose-invert prose-pre:bg-transparent
prose-hr:border-neutral-800 prose-pre:p-0 prose-pre:pt-4 prose-pre:-mt-4`

If you don't want to use default className remove `defaults` from  `<FwSH defaults ...`  and add className like `<FwSH className={'tailwind class names'} ...` to apply your desired className.

### global.css

Update your `global.css` if needed

```css

@tailwind base;
@tailwind components;
@tailwind utilities;

pre>code::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

pre>code::-webkit-scrollbar-thumb {
  background-color: #4a5568; /* Change this to your desired thumb color */
  border-radius: 2.5px;
  height: 2px;
}

pre>code::-webkit-scrollbar-thumb:hover {
  background-color: #3c3d3e; /* Change this to your desired thumb color on hover */
}

pre>code::-webkit-scrollbar-track {
  background-color: transparent; /* Change this to your desired track color */
}

```

### Running the App

With all the files in place, start your Next.js app using `npm run dev` and navigate to the home page to see your post with syntax highlighting applied.

Now you have successfully added syntax highlighting to your blog post in a Next.js app using TypeScript and Tailwind CSS. Happy coding!
