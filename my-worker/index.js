addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

var array = new Array();

class TitleHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
      element.setInnerContent("Michael Jee");
    }
  }   
}

class BodyHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
      element.setAttribute("style", "background-color:#44337A");
    }
  }   
}

class LinksHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
console.log(element.namespaceURI);
      element.append('<a href=\"' + array[0].url + '\">Wrangler</a>', {html:true});
      element.append('<a href=\"' + array[1].url + '\">HTML Rewriter</a>', {html:true});
      element.append('<a href=\"' + array[2].url + '\">Cloudflare Intern Assignment</a>', {html:true});
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
      element.removeAttribute("style");
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

class SocialHandler
{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    const attribute = element.getAttribute;
    if(attribute) {
      element.removeAttribute("style");
      element.append('<a id=\"linkedin\" href=\"https://www.linkedin.com/in/michaeljee2/\">' + 
        '<img id=\"linkedinsvg\" src=\"https://simpleicons.org/icons/linkedin.svg\" alt=\"linkedin\">' +
        '</img></a>', {html:true});
      element.append('<a id=\"github\" href=\"https://github.com/mdjee805/\"><img id=\"githubsvg\"' + 
        'src=\"https://simpleicons.org/icons/github.svg\" alt=\"github\"></img></a>', {html:true});
      element.append('<a id=\"rankedVoting\"' + 
        'href=\"http://ranked-choice-voting-env1.eba-fyvhhdzp.us-west-1.elasticbeanstalk.com/\">' + 
        '<img id=\"rankedVotingsvg\" src=\"https://simpleicons.org/icons/amazonaws.svg\"' + 
        'alt=\"rankedVoting\"> </img></a>', {html:true});
    }
  }   
}

const rewriter = new HTMLRewriter()
  .on('title', new TitleHandler())
  .on('body', new BodyHandler())
  .on('div#links', new LinksHandler())
  .on('div#profile', new ProfileHandler())
  .on('img#avatar', new ProfilePicHandler())
  .on('h1#name', new ProfileNameHandler())
  .on('div#social', new SocialHandler())

async function handleRequest(request) {
  if (request.url.split('michaeldanieljee.workers.dev')[1] === '/links') {
    return new Response(await generateLinkArray(array), {
      headers: { 'content-type': 'application/json' },
      })
  } else {
    return await generatePage(request)  }
}

async function generateLinkArray(array) {
  generateLink(array, "wrangler", "https://github.com/cloudflare/wrangler");
  generateLink(array, "htmlRewriter", "https://developers.cloudflare.com/workers/runtime-apis/html-rewriter#properties");
  generateLink(array, "internAssignment", "https://github.com/cloudflare-hiring/cloudflare-2020-general-engineering-assignment/");
  return JSON.stringify(array);
}

async function generateLink(array, name, link) {
  let item = {"name": [name], "url": [link]};
  array.push(item);
}

async function generatePage(request) {
  await generateLinkArray(array);
  const res = await fetch("https://static-links-page.signalnerve.workers.dev");
  return rewriter.transform(res);
}
