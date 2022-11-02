# Algosea Similarity Service

It uses an implementation of the [K-Nearest Neighbors Algorithm](https://www.ibm.com/topics/knn)

# Backend

The backend takes the 4 attributes (combat, constitution, luck, plunder) of the pirate we want to compare.

Then it fetches all the pirates from the list available at `https://d3ohz23ah7.execute-api.us-west-2.amazonaws.com/prod/marketplace/listings?collectionName=AlgoSeas%20Pirates&sortBy=time&sortAscending=false&limit=500` and stores them in an array.

Then it computes the euclidian distance between my pirate and all those from the array and adds the distance value to each pirate.

Then it sorts the array by inscreasing distance.

Finally, the backend returns the 3-Nearest Neighbors.

The code has been deployed on a serverless server on Cloudflare. To test it:

```
POST https://algorand-similarity-service.neutrino.workers.dev/find-similar
{
    "combat": 40,
    "constitution": 45,
    "luck": 52,
    "plunder": 38
}
```

# Frontend

We first developed a dedicated frontend for this, but then decided it would much more ergonomic to create a Chrome script that executes automatically when browser a pirate on algoseas, e.g. https://algoseas.io/marketplace/asset/911883637 then display the nearest neighbors directly on the marketplace!
