import fetch from 'node-fetch';
import DOMParser from 'dom-parser';
import cheerio from 'cheerio';
import HttpsProxyAgent from 'https-proxy-agent';
import fs from 'fs';

async function fetchMetaData() {
    const listjokes = (number) => fetch(`https://flot.com/welfare/anecdote/anecdotes.php?PAGEN_1=${number}`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'User-Agent': 'PostmanRuntime/7.29.2',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        },
        agent: new HttpsProxyAgent('http://proxy.compassplus.ru:3128')
    })
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
        const html = new TextDecoder('windows-1251').decode(buffer);

        return new DOMParser().parseFromString(html, 'text/html').rawHTML;
    })
    .catch(error => {
        console.log(error);

        return '';
    });
    const res = await listjokes(1);
    const $ = cheerio.load(res);
    const textCount = $('.news-list > .text:first-of-type').text() || '';
    const [_, firstPageCountAnecdotes = 1, allCountAnecdotes = 1] = textCount.match(/\d+/g);
    const pageCount = Math.ceil(+allCountAnecdotes / +firstPageCountAnecdotes);
    const parseAnekdotes = (html) =>  {
        const $ = cheerio.load(html);
        const aneckdoteslist = [];

        $('.news-item').each((i, element) => {
            const title = $('b', $(element)).text();

            $('b', $(element)).remove();

            const body = $(element).text().trim();

            aneckdoteslist.push({title,body});
        });

        return aneckdoteslist;
    }
    let anekdotes = parseAnekdotes(res);
       
    for (let i = 2; i <= pageCount; i++) {
      anekdotes = anekdotes.concat(parseAnekdotes(await listjokes(i)));
    }

    fs.writeFileSync('data.json', JSON.stringify(anekdotes));
}

export {fetchMetaData};