
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  contentHtml?: string;
  [key: string]: any;
}

export function getSortedArticlesData(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { 
        title: string; 
        date: string; 
        author: string; 
        excerpt: string; 
        image: string; 
      }),
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getArticleData(slug: string): Promise<Article> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Article not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id: slug,
      contentHtml,
      ...(matterResult.data as {
        title: string;
        date: string;
        author: string;
        excerpt: string;
        image: string;
      }),
    };
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    throw error;
  }
}