#!/usr/bin/env node
/**
 * Blogger Template Updater
 * 
 * Automates updating the Blogger XML template (public/index.html) by fetching
 * real data from the Blogger API and injecting it into template placeholders.
 * 
 * Usage:
 *   # Interactive TUI mode
 *   node scripts/blogger-update.mjs
 *   
 *   # CLI mode with flags
 *   node scripts/blogger-update.mjs --blog-id YOUR_BLOG_ID
 *   node scripts/blogger-update.mjs --output custom-output.html
 *   node scripts/blogger-update.mjs --json
 *   node scripts/blogger-update.mjs --preview
 *   node scripts/blogger-update.mjs --force
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

// Configuration
const DEFAULT_BLOG_ID = '5624631557745671504';
const DEFAULT_OUTPUT = resolve(ROOT_DIR, 'public', 'index.html');
const BLOG_API_KEY = 'AIzaSyB2MpzH-Gq6fnWuUnoI2PH2sPMTkGIQ9b0';
const BLOGGER_API_BASE = 'https://www.googleapis.com/blogger/v3';

// CLI Arguments parser
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    blogId: null,
    output: DEFAULT_OUTPUT,
    json: false,
    preview: false,
    force: false,
    help: false,
    interactive: !args.some(a => a.startsWith('--'))
  };
  
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--blog-id':
      case '-b':
        options.blogId = args[++i];
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--json':
      case '-j':
        options.json = true;
        break;
      case '--preview':
      case '-p':
        options.preview = true;
        break;
      case '--force':
      case '-f':
        options.force = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }
  
  return options;
}

// Helper: prompt for input in TUI mode
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// API Functions
async function fetchBlogInfo(blogId, apiKey) {
  const url = `${BLOGGER_API_BASE}/blogs/${blogId}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch blog info: ${error.message}`);
  }
}

async function fetchPosts(blogId, maxResults, apiKey) {
  const url = `${BLOGGER_API_BASE}/blogs/${blogId}/posts?maxResults=${maxResults}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.items || [];
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

async function fetchFeaturedPost(blogId, apiKey) {
  // Fetch the most recent post as featured
  const posts = await fetchPosts(blogId, 1, apiKey);
  return posts[0] || null;
}

// Data transformation functions
function transformPost(post) {
  const pubDate = new Date(post.published);
  const dateStr = pubDate.toISOString().split('T')[0];
  
  // Extract first image from content
  const imageMatch = post.content?.match(/src="([^"]+)"/);
  const featuredImage = imageMatch ? imageMatch[1] : '';
  
  // Get excerpt (first 200 chars)
  const plainText = post.content?.replace(/<[^>]*>/g, '') || '';
  const description = plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '');
  
  return {
    title: post.title,
    description,
    url: post.url,
    link: '',
    thumbnailUrl: '',
    featuredImage,
    date: pubDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    lastUpdated: dateStr,
    author: {
      name: post.author?.displayName || 'Admin',
      url: post.author?.userUrl || ''
    }
  };
}

function transformFeaturedPost(post) {
  if (!post) return null;
  
  const pubDate = new Date(post.published);
  const plainText = post.content?.replace(/<[^>]*>/g, '') || '';
  const description = plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '');
  
  return {
    id: post.id,
    title: post.title,
    date: pubDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    author: {
      name: post.author?.displayName || 'Admin',
      image: ''
    },
    body: post.content || ''
  };
}

// XML escape for Blogger template safety
function xmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Template updater functions
function updatePopularPosts(html, posts) {
  const transformed = posts.map(transformPost);
  
  // Wrap in {title, data} structure expected by template
  const payload = {
    title: 'Popular Posts',
    data: transformed
  };
  const jsonStr = JSON.stringify(payload, null, 2);
  
  // Replace the __POPULAR_POST__ placeholder content
  // Match the full JSON.stringify call with its object literal body
  const popularPostRegex = /window\.__POPULAR_POST__ = JSON\.stringify\(\{[\s\S]*?\}\)/;
  const newScript = `window.__POPULAR_POST__ = JSON.stringify(${jsonStr})`;
  
  return html.replace(popularPostRegex, newScript);
}

function updateFeaturedPost(html, post) {
  const transformed = transformFeaturedPost(post);
  if (!transformed) return html;
  
  // Escape HTML entities in body for XML context
  transformed.body = xmlEscape(transformed.body);
  
  const jsonStr = JSON.stringify(transformed, null, 2);
  
  // Replace the __POSTS__ placeholder content
  // Match from window.__POSTS__ to the closing ); of JSON.stringify
  const postsRegex = /window\.__POSTS__ = JSON\.stringify\(\{[\s\S]*?\}\);\s*\n/;
  const newScript = `window.__POSTS__ = JSON.stringify(${jsonStr});\n              `;
  
  return html.replace(postsRegex, newScript);
}

function updateConfig(html, blogInfo) {
  const blogId = blogInfo.id;
  const blogUrl = blogInfo.url;
  
  // Update config with blog info
  const configRegex = /window\.__CODEPELAJAR_CONFIG__ = \{[\s\S]*?\};/;
  const newConfig = `window.__CODEPELAJAR_CONFIG__ = {
      blogId: "${blogId}",
      disqus: "codepelajar",
      addThisId: "5dd79989c6588238",
      cseUrl: "https://cse.google.com/cse.js?cx=005178091281942032751:rimwwhz9ofx"
    };`;
  
  return html.replace(configRegex, newConfig);
}

// Main execution flow
async function main() {
  const options = parseArgs();
  
  // Help flag
  if (options.help) {
    console.log(`
Blogger Template Updater
========================

Usage:
  node scripts/blogger-update.mjs [options]

Options:
  -b, --blog-id ID    Blog ID to update (default: ${DEFAULT_BLOG_ID})
  -o, --output FILE   Output file path (default: public/index.html)
  -j, --json          Output as JSON instead of HTML
  -p, --preview       Preview changes without writing
  -f, --force         Force update without confirmation
  -h, --help          Show this help message

Examples:
  # Interactive TUI mode
  node scripts/blogger-update.mjs
  
  # CLI mode
  node scripts/blogger-update.mjs --blog-id YOUR_BLOG_ID --force
  
  # Preview changes
  node scripts/blogger-update.mjs --preview
`);
    process.exit(0);
  }
  
  // TUI Mode
  if (options.interactive) {
    console.log('\n🚀 Blogger Template Updater');
    console.log('═'.repeat(40));
    
    // Get blog ID
    if (!options.blogId) {
      options.blogId = await prompt(`\nEnter Blog ID (default: ${DEFAULT_BLOG_ID}): `) || DEFAULT_BLOG_ID;
    }
    
    console.log(`\n✓ Using Blog ID: ${options.blogId}\n`);
    
    // Fetch data
    console.log('📡 Fetching blog data...');
    let blogInfo, posts, featuredPost;
    
    try {
      [blogInfo, posts, featuredPost] = await Promise.all([
        fetchBlogInfo(options.blogId, BLOG_API_KEY),
        fetchPosts(options.blogId, 10, BLOG_API_KEY),
        fetchFeaturedPost(options.blogId, BLOG_API_KEY)
      ]);
      console.log('✓ Fetched', posts.length, 'posts');
    } catch (error) {
      console.error('\n❌ Error fetching data:', error.message);
      rl.close();
      process.exit(1);
    }
    
    // Read template
    let html;
    try {
      html = readFileSync(options.output, 'utf8');
      console.log('✓ Read template from', options.output);
    } catch (error) {
      console.error('\n❌ Error reading template:', error.message);
      rl.close();
      process.exit(1);
    }
    
    // Transform data
    console.log('\n🔄 Transforming data...');
    let updatedHtml = updatePopularPosts(html, posts);
    updatedHtml = updateFeaturedPost(updatedHtml, featuredPost);
    updatedHtml = updateConfig(updatedHtml, blogInfo);
    
    // Preview or save
    if (options.preview) {
      console.log('\n👁 Preview mode - showing diff summary:');
      console.log('  - Popular Posts:', posts.length, 'posts');
      console.log('  - Featured Post:', featuredPost?.title || 'None');
      console.log('  - Blog ID:', blogInfo?.id);
      console.log('\nTo apply changes, remove --preview flag.');
    } else if (options.json) {
      const jsonData = {
        blogId: blogInfo?.id,
        popularPosts: {
          title: 'Popular Posts',
          data: posts.map(transformPost)
        },
        featuredPost: transformFeaturedPost(featuredPost),
        config: {
          blogId: blogInfo?.id,
          disqus: 'codepelajar',
          addThisId: '5dd79989c6588238',
          cseUrl: 'https://cse.google.com/cse.js?cx=005178091281942032751:rimwwhz9ofx'
        }
      };
      console.log(JSON.stringify(jsonData, null, 2));
    } else {
      // Confirm before writing
      if (!options.force) {
        const confirm = await prompt('\n💾 Apply changes to ' + options.output + '? (y/N): ');
        if (!confirm.toLowerCase().startsWith('y')) {
          console.log('\n✗ Update cancelled.');
          rl.close();
          return;
        }
      }
      
      writeFileSync(options.output, updatedHtml, 'utf8');
      console.log('\n✅ Template updated successfully!');
      console.log('   Output:', options.output);
    }
    
    rl.close();
  } else {
    // CLI Mode
    if (!options.blogId) {
      options.blogId = DEFAULT_BLOG_ID;
    }
    
    console.log(`Updating template for blog: ${options.blogId}`);
    
    // Fetch data
    let blogInfo, posts, featuredPost;
    try {
      [blogInfo, posts, featuredPost] = await Promise.all([
        fetchBlogInfo(options.blogId, BLOG_API_KEY),
        fetchPosts(options.blogId, 10, BLOG_API_KEY),
        fetchFeaturedPost(options.blogId, BLOG_API_KEY)
      ]);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
    
    // Read and update template
    let html = readFileSync(options.output, 'utf8');
    let updatedHtml = updatePopularPosts(html, posts);
    updatedHtml = updateFeaturedPost(updatedHtml, featuredPost);
    updatedHtml = updateConfig(updatedHtml, blogInfo);
    
    // Output
    if (options.preview) {
      console.log('Preview mode - no changes written');
      console.log('Popular posts:', posts.length);
      console.log('Featured post:', featuredPost?.title);
    } else if (options.json) {
      const jsonData = {
        blogId: blogInfo?.id,
        popularPosts: {
          title: 'Popular Posts',
          data: posts.map(transformPost)
        },
        featuredPost: transformFeaturedPost(featuredPost),
        config: {
          blogId: blogInfo?.id,
          disqus: 'codepelajar',
          addThisId: '5dd79989c6588238',
          cseUrl: 'https://cse.google.com/cse.js?cx=005178091281942032751:rimwwhz9ofx'
        }
      };
      console.log(JSON.stringify(jsonData, null, 2));
    } else {
      writeFileSync(options.output, updatedHtml, 'utf8');
      console.log(`✓ Template updated: ${options.output}`);
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
