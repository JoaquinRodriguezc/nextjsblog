import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
const postsDirectory = path.join(process.cwd(),'posts');
//funcion que devuelve array de posteos en orden por fecha
export function getSortedPostsData(){
    // Get file names under /posts
    const filesName = fs.readdirSync(postsDirectory);
    const allPostData = filesName.map((fileName)=>{
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
    
    //Read markdown file as string
    const fullpath = path.join(postsDirectory,fileName);
    const fileContents = fs.readFileSync(fullpath,'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
        id,...matterResult.data,
        };
    });
    return allPostData.sort((a,b) =>{
        if (a.date < b.date) {
            return 1;
          } else {
            return -1;
          }
          });
}
//funcion q devuelve los id de cada post
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
//nos devuelve los post dependiendo del id
export async function getPostData(id){
  const fullPath = path.join(postsDirectory,`${id}.md`);
  const fileContents = fs.readFileSync(fullPath,`utf8`);

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}