import processTpl from 'import-html-entry/lib/process-tpl'

const jsDelivrGithubMiddleware = async(ctx, next) => {
  const userAndRepo = ctx.name
  const version = ctx.version ? `@${ctx.version}` : ''
  const baseUrl = `https://cdn.jsdelivr.net/gh/${userAndRepo}${version}/dist`
  const res = await fetch(`${baseUrl}/index.html`)
  const html = await res.text()
  const { scripts, styles } = processTpl(html, baseUrl)
  if (styles.length > 0) {
    styles.filter(item => item.endsWith('.css')).forEach((url) => {
      ctx.loadCss(url)
    })
  }
  if (scripts.length > 0) {
    const externalScriptsUrls = scripts.filter(item => item.endsWith('.js'))
    for (const url of externalScriptsUrls) {
      await ctx.loadJs(url)
    }
  }
  if (styles.length + scripts.length === 0) {
    await next()
  }
}

export default jsDelivrGithubMiddleware
