import { marpCli } from '@marp-team/marp-cli'
import fs from 'fs/promises'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function processSlides() {
  const rootDir = process.cwd()
  const slidesSourceDir = path.join(rootDir, '..', 'slides')
  const slidesOutputDir = path.join(rootDir, 'static', 'slides')
  const markdownOutputDir = path.join(rootDir, 'src', 'routes', 'notes')
  const imagesSourceDir = path.join(slidesSourceDir, 'images')
  const imagesOutputDir = path.join(slidesOutputDir, 'images')
  const dataDir = path.join(rootDir, 'src', 'lib', 'data')

  const referencesPath = path.join(rootDir, '..', 'references.md')

  // Ensure directories exist
  await fs.mkdir(slidesOutputDir, { recursive: true })
  await fs.mkdir(markdownOutputDir, { recursive: true })
  await fs.mkdir(imagesOutputDir, { recursive: true })
  await fs.mkdir(dataDir, { recursive: true })

  // Get all .md files
  const files = await fs.readdir(slidesSourceDir)
  const mdFiles = files.filter(file => file.endsWith('.md'))

  const slideRefs = []

  // Copy references.md to notes directory
  try {
    const referencesContent = await fs.readFile(referencesPath, 'utf-8')
    await fs.writeFile(
      path.join(markdownOutputDir, 'references.md'),
      referencesContent
    )
    console.log('Copied references.md to notes directory')
  } catch (error) {
    console.error('Error copying references.md:', error)
  }

  // Process each markdown file
  for (const file of mdFiles) {
    const inputPath = path.join(slidesSourceDir, file)
    const outputName = file.replace('.md', '.html')
    const outputPath = path.join(slidesOutputDir, outputName)
    const slug = file.replace('.md', '')

    // Read content and fix image paths
    let content = await fs.readFile(inputPath, 'utf-8')
    
    // Replace both "images/" and "./images/" with "/slides/images/"
    content = content
      .replace(/!\[([^\]]*)\]\(images\//g, '![$1](/slides/images/')
      .replace(/!\[([^\]]*)\]\(\.\/images\//g, '![$1](/slides/images/')
      // Also handle potential HTML img tags
      .replace(/src="images\//g, 'src="/slides/images/')
      .replace(/src="\.\/images\//g, 'src="/slides/images/')

    // Write modified markdown for document view
    const markdownDestPath = path.join(markdownOutputDir, `${slug}.md`)
    await fs.writeFile(markdownDestPath, content)
    console.log(`Copied and modified markdown file to: ${markdownDestPath}`)

    // Read the first few lines to extract title
    const titleMatch = content.match(/(?:title:\s*["'](.+?)["'])|(?:^#\s+(.+))/m)
    const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : file.replace('.md', '')

    // Convert to HTML using Marp CLI
    const exitStatus = await marpCli([
      inputPath,
      '--output', outputPath,
      '--html',
      '--allow-local-files',
      '--theme', path.join(slidesSourceDir, 'custom-theme.css')
    ])

    if (exitStatus > 0) {
      console.error(`Failed to process ${file} (Exit status: ${exitStatus})`)
      continue
    }

    slideRefs.push({
      title,
      filename: outputName,
      slidePath: `/slides/${outputName}`,
      docPath: `/notes/${slug}`,
      original: file
    })
  }

  // Save slide references
  await fs.writeFile(
    path.join(dataDir, 'slides.json'),
    JSON.stringify(slideRefs, null, 2)
  )

  // Rsync images with --delete flag to remove files that no longer exist in source
  try {
    await execAsync(`rsync -av --delete "${imagesSourceDir}/" "${imagesOutputDir}/"`)
    console.log('Images synced successfully')
  } catch (error) {
    console.error('Error syncing images:', error)
  }

  console.log(`Processed ${mdFiles.length} slides`)
  console.log('Slide references saved to slides.json')
}

processSlides().catch(console.error)
