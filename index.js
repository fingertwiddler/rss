import RSS from "https://jspm.dev/rss"
import marked from "https://jspm.dev/marked"
export default async function (items, config, offbase) {
  // Do RSS only when there's custom BASE URL
  // Instantiate RSS
  let feed = new RSS()
  let feedItems = items.slice(0, config.FEED.CHUNK)
  feedItems.forEach((item) => {
    let html;
    if (config.FEED.BASE.length === 0) {
      html = marked(item.content, { baseUrl: "../" }) 
    } else {
      html = marked(item.content, { baseUrl: config.FEED.BASE }) 
    }
    feed.item({
      title: item.data.title,
      description: html,
      url: `${config.FEED.BASE}${item.key}`,
      date: item.data.updated
    })
  })
  debugger;
  let xml = feed.xml({ indent: true });
  await offbase.fs.promises.writeFile(`${config.DEST}/rss.xml`, xml)
}
