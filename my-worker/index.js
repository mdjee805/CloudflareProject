addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

/*var array = '{ "data": [' +
  '{"name":"name0", "url":"https://linkurl/0"},' +
  '{"name":"name1", "url":"https://linkurl/1"},' +
  '{"name":"name2", "url":"https://linkurl/2"} ]}';*/
var array = new Array();

class LinksHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
      element.setInnerContent('<a href=\"' + array[0].url + '\"></a> ');
      element.append('<a href=\"' + array[1].url + '\"></a> ');
      element.append('<a href=\"' + array[2].url + '\"></a> ');
      element.prepend('<a href=\"' + array[0].url + '\"></a> ');
    }
  }   
}

class ProfileHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
      element.setAttribute("style", "");
    }
  }   
}

class ProfilePicHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
      element.setAttribute("src", "https://avatars3.githubusercontent.com/u/35746000?s=460&u=9944eb8f5b263272dcf9e401cf2192fbbf70559a&v=4");
    }
  }   
}

class ProfileNameHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
      element.setInnerContent("michaeldanieljee@gmail.com");
    }
  }   
}

const rewriter = new HTMLRewriter()
  .on('div#links', new LinksHandler())
  .on('div#profile', new ProfileHandler())
  .on('img#avatar', new ProfilePicHandler())
  .on('h1#name', new ProfileNameHandler())

async function handleRequest(request) {
  if (request.url.split('michaeldanieljee.workers.dev')[1] === '/links') {
    /*return new Response(array, {
      headers: { 'content-type': 'application/json' },
      })*/
    return new Response(await generateLinkArray(request), {
      headers: { 'content-type': 'application/json' },
      })
  } else {//if (request.url.split('michaeldanieljee.workers.dev')[1] === '/mdjee.png') {
    return await generatePage(request)  }
}

async function generateLinkArray(request) {
  generateLink(array, "name0", "https://linkurl/0");
  generateLink(array, "name1", "https://linkurl/1");
  generateLink(array, "name2", "https://linkurl/2");
  return JSON.stringify(array);
}

async function generateLink(array, name, link) {
  let item = {"name": [name], "url": [link]};
  array.push(item);
}

async function generatePage(request) {
  const res = await fetch("https://static-links-page.signalnerve.workers.dev");
  return rewriter.transform(res);
}
