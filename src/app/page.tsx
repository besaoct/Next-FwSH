import FwSH from "./dist/FwSH"

import { getPostData } from "./utils/getPost"

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
