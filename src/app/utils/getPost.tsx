
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
     
     // use gray-matter
    const matterResult = matter(fileContents);
    

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    
  
    const contentHtml = processedContent.toString();
    const PostsWithHTML: { contentHtml: string } = {
        contentHtml,
    }

    return PostsWithHTML
}