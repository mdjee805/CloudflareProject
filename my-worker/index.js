addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

var array = '{ "data": [' +
  '{"name":"name0", "url":"https://linkurl/0"},' +
  '{"name":"name1", "url":"https://linkurl/1"},' +
  '{"name":"name2", "url":"https://linkurl/2"} ]}';

async function handleRequest(request) {
  if (request.url.split('michaeldanieljee.workers.dev')[1] === '/links') {
    return new Response(array, {
      headers: { 'content-type': 'application/json' },
      })
    /*return new Response(await generateLinkArray(request), {
      headers: { 'content-type': 'application/json' },
      })*/
  } else {
    return await generatePage(request)  }
}

/*async function generateLinkArray(request) {
  let array = new Array();
  generateLink(array, "name0", "https://linkurl/0");
  generateLink(array, "name1", "https://linkurl/1");
  generateLink(array, "name2", "https://linkurl/2");
  return array;
}

async function generateLink(array, name, link) {
  let item = {"name": [name], "url": [link]};
  array.push(item);
}*/

async function generatePage(request) {
  URL = await fetch('https://static-links-page.signalnerve.workers.dev')
  return new Response(URL, {
    headers: { 'content-type': 'text/plain' },
  })
}
