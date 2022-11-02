export default {
    async fetch(request, env) {
      return await handleRequest(request).catch((err) => new Response(err.stack, { status: 500 }))
    },
  }
  
  /**
   * Many more examples available at:
   *   https://developers.cloudflare.com/workers/examples
   * @param {Request} request
   * @returns {Promise<Response>}
   */
  async function handleRequest(request) {
    const { pathname } = new URL(request.url)
  
    if (pathname.startsWith('/find-similar')) {
      // const myPirate = request.body.json()
      const myPirate = await request.json()
  
      const listingResp = await fetch(
        'https://d3ohz23ah7.execute-api.us-west-2.amazonaws.com/prod/marketplace/listings?collectionName=AlgoSeas%20Pirates&sortBy=time&sortAscending=false&limit=500', 
        {
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        }
      )
  
      const listing = await listingResp.json();
  
      const pirates = []
      listing.forEach((el) => {
        const name = el?.assetInformation?.nName
        const rank = el?.assetInformation?.nRank
        const image = el?.assetInformation?.nProps?.media_url
        const price = el?.assetInformation?.listing?.price
        const combat = el?.assetInformation?.nProps?.properties?.combat
        const constitution = el?.assetInformation?.nProps?.properties?.constitution
        const luck = el?.assetInformation?.nProps?.properties?.luck
        const plunder = el?.assetInformation?.nProps?.properties?.plunder
  
        const combatDistance = Math.pow(combat - myPirate.combat, 2)
        const constitutionDistance = Math.pow(constitution - myPirate.constitution, 2)
        const luckDistance = Math.pow(luck - myPirate.luck, 2)
        const plunderDistance = Math.pow(plunder - myPirate.plunder, 2)
  
        const distance = Math.sqrt(combatDistance + constitutionDistance + luckDistance + plunderDistance)
      
        if (distance)
          pirates.push({
            name,
            rank,
            image,
            price,
            combat,
            constitution,
            luck,
            plunder,
            distance,
          })
      })
  
      pirates.sort((a, b) => a.distance - b.distance)
  
      return new Response(JSON.stringify({ pirates: [pirates[0], pirates[1], pirates[2], pirates[3], pirates[4]] }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
  