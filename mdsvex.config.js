import { visit } from 'unist-util-visit'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import relativeImages from 'mdsvex-relative-images'
import remarkHeadings from '@vcarl/remark-headings'

export default {
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  highlight: ,
  remarkPlugins: [videos, relativeImages, headings],
  rehypePlugins: [
    slugPlugin,
    [
      autolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
}

function highlighter(code, lang, meta){
  let fence: any
  let twoslash: any
  try {
    fence = parseFence(lex([lang, meta].filter(Boolean).join(' ')))
  } catch (error) {
    throw new Error(`Could not parse the codefence for this code sample \n${code}`)
  }
  if (fence?.twoslash === true) twoslash = runTwoSlash(code, lang as string)
  return `{@html \`${escapeSvelte(
    renderCodeToHTML(
      code,
      lang as string,
      fence ?? {},
      { themeName: 'material-default' },
      await createShikiHighlighter({ theme: 'material-default' }),
      twoslash
    )
  )}\` }`
}

/**
 * Adds support to video files in markdown image links
 */
function videos() {
  const extensions = ['mp4', 'webm']
  return function transformer(tree) {
    visit(tree, 'image', (node) => {
      if (extensions.some((ext) => node.url.endsWith(ext))) {
        node.type = 'html'
        node.value = `
            <video 
              src="${node.url}"
              autoplay
              muted
              playsinline
              loop
              title="${node.alt}"
            />
          `
      }
    })
  }
}

/**
 * Parses headings and includes the result in metadata
 */
function headings() {
  return function transformer(tree, vfile) {
    // run remark-headings plugin
    remarkHeadings()(tree, vfile)

    // include the headings data in mdsvex frontmatter
    vfile.data.fm ??= {}
    vfile.data.fm.headings = vfile.data.headings.map((heading) => ({
      ...heading,
      // slugify heading.value
      id: heading.value
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    }))
  }
}
