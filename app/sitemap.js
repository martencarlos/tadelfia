
import data from "/app/villas/[id]/data.json";

export default function sitemap() {
    const baseUrl = "https://tadelfia.webframe.one"
    const villasUrls = data.map((item) => {
        return {
            "url": `${baseUrl}/villas/${item.villa}`,
            "lastModified": new Date(),
        }
    })
    

  return [
    {
        "url": baseUrl,
        "lastModified": new Date(),
    },
    {
        "url": baseUrl+"/villas",
        "lastModified": new Date(),
    },
    {
        "url": baseUrl+"/about",
        "lastModified": new Date(),
    },
    {
        "url": baseUrl+"/contact",
        "lastModified": new Date(),
    },
    {
        "url": baseUrl+"/policy",
        "lastModified": new Date(),
    },
    
    ...villasUrls
  ]
}