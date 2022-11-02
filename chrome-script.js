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
    console.log('GO')
  
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
            console.log(response.response)
          },
        })
      } catch (err) {
        console.log(err)
      }
    }, 2000)
  })()
  