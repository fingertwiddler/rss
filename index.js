import RSS from "https://jspm.dev/rss"
import marked from "https://jspm.dev/marked"
export default async function (items, config, offbase) {
  // Do RSS only when there's custom BASE URL
  // Instantiate RSS
  let feed = new RSS()
  let feedItems = items.slice(0, config.settings.FEED.CHUNK)
  feedItems.forEach((item) => {
    let html;
    if (config.settings.FEED.BASE.length === 0) {
      html = marked(item.content, { baseUrl: "../" }) 
    } else {
      html = marked(item.content, { baseUrl: config.settings.FEED.BASE }) 
    }
    feed.item({
      title: item.data.title,
      description: html,
      url: `${config.settings.FEED.BASE}${item.key}`,
      date: item.data.updated
    })
  })
  debugger;
  let xml = feed.xml({ indent: true });
  await offbase.fs.promises.writeFile(`${config.settings.DEST}/rss.xml`, xml)
}
