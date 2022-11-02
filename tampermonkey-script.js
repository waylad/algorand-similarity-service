// ==UserScript==
// @name         Algoseas Similarity Service
// @namespace    https://algoseas.io/marketplace/asset/*
// @version      0.1
// @description  Displays similar pirates on Algoseas
// @author       Waylad
// @match        https://algoseas.io/marketplace/asset/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=algoseas.io
// @grant        GM_xmlhttpRequest
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* global $ */

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await GM.xmlHttpRequest(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }
  
  ;(async function () {
    'use strict'
    console.log('Fethching similar pirates ...')
  
    setTimeout(() => {
      const combat = parseInt($('table span:contains("combat")').parent().text().replace('combat: ', ''))
      console.log('combat', combat)
      const constitution = parseInt(
        $('table span:contains("constitution")').parent().text().replace('constitution: ', ''),
      )
      console.log('constitution', constitution)
      const luck = parseInt($('table span:contains("luck")').parent().text().replace('luck: ', ''))
      console.log('luck', luck)
      const plunder = parseInt($('table span:contains("plunder")').parent().text().replace('plunder: ', ''))
      console.log('plunder', plunder)
  
      try {
        GM.xmlHttpRequest({
          method: 'POST',
          url: 'https://algorand-similarity-service.neutrino.workers.dev/find-similar',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic hello',
            'User-Agent': 'hello',
          },
          data: JSON.stringify({ combat: combat, constitution: constitution, luck: luck, plunder: plunder }),
          dataType: 'json',
          contentType: 'application/json',
          overrideMimeType: 'application/json',
          onload: function (response) {
              const result = JSON.parse(response.response);
              console.log(result)
  
              $('.max-w-screen-xl.mx-auto.mt-16.text-center').prepend(`<div>
    <h2 class="inline-block mb-4 text-3xl text-gray-100">Similar Listings</h2>
    <div id="similar">
    </div></div>
  `)
              result.pirates.forEach(pirate => {
                  $('#similar').append(`
                  <a
    class="bg-gradient-135 from-gray-900 inline-block overflow-hidden relative rounded-lg shadow-lg shadow-gray-600/60 hover:shadow-gray-600/100 text-gray-100 hover:text-yellow-300 to-gray-700 transition-all w-60 m-2"
    href="/marketplace/asset/${pirate.rank}"
    ><div class="overflow-hidden relative h-60 w-60">
      <div class="flex h-full items-center justify-center w-full">
        <div class="text-center text-gray-400 text-sm"></div>
      </div>
      <img
        alt="asset"
        class="absolute bottom-0 left-0 opacity-0 right-0 top-0 z-10"
        src="https://cdn.algoseas.io/?format=webp&amp;x=240&amp;y=240&amp;y_prime=1&amp;asa=835296339&amp;uri=https://cdn.algoseas.io/pirates/${pirate.name.replace('AlgoSeas Pirate #', '')}.png"
      />
      <div
        class="absolute bg-cover bg-center bg-no-repeat h-full left-0 top-0 w-full !bg-top"
        style="
          background-image: url('https://cdn.algoseas.io/?format=webp&amp;x=240&amp;y=240&amp;y_prime=1&amp;asa=835296339&amp;uri=https://cdn.algoseas.io/pirates/${pirate.name.replace('AlgoSeas Pirate #', '')}.png');
        "
      ></div>
    </div>
    <div class="p-2 text-center w-full">
      <div class="flex justify-between">
        <span class="flex font-medium items-center text-sm truncate"
          ><span class="truncate">${pirate.name}</span></span>
      </div>
      <span
        class="flex items-center justify-between mt-1 opacity-70 !text-gray-100 text-xs"
        ><div class="inline-flex items-center" title="ALGO">
          <span class="inline-block">${pirate.price / 1000000}</span
          ><img
            class="h-4 w-4 ml-1 inline-block"
            src="/images/algo-white256.png"
            alt="ALGO"
          /></div
      ></span>
      <div class="bg-blu-500/30 -m-2 mt-4 p-2 !text-gray-400 text-left text-sm">
        <span class="block"
          ><span class="font-medium">combat:</span
          ><span class="inline-block ml-2">${pirate.combat}</span></span
        ><span class="block"
          ><span class="font-medium">constitution:</span
          ><span class="inline-block ml-2">${pirate.constitution}</span></span
        ><span class="block"
          ><span class="font-medium">luck:</span
          ><span class="inline-block ml-2">${pirate.luck}</span></span
        ><span class="block"
          ><span class="font-medium">plunder:</span
          ><span class="inline-block ml-2">${pirate.plunder}</span></span
        ><span class="block"
          ><span class="font-medium">euclidian distance:</span
          ><span class="inline-block ml-2">${Math.round(pirate.distance)}</span></span
        >
      </div>
    </div></a
  >
  `)
              })
  
          },
        })
      } catch (err) {
        console.log(err)
      }
    }, 2000)
  })()
  