const fetch = require('node-fetch');
const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');



/**
 * Tiny helper method to make requesting API endpoints a little DRY-er
 * @param {String} method the last.fm api method
 * @param {Object} args the graphql arguments
 * @return {Object} json response
 */
const request = (method, args) => {
  return fetch(
  `${process.env.API_ENDPOINT}${method}&user=${args.username}&limit=${args.limit}&api_key=${process.env.API_KEY}&format=json`
  )
  .then(response => response.json());
}



const ArtistType = new GraphQLObjectType({
  name: 'Artist',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: response => response.name || response['#text'] // silly last.fm!
    },
    playcount: {
      type: GraphQLString,
      resolve: response => response.playcount
    },
    url: {
      type: GraphQLString,
      resolve: response => response.url
    }
  })
});



const TrackType = new GraphQLObjectType({
  name: 'Track',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: response => response.name
    },
    duration: {
      type: GraphQLString,
      resolve: response => response.duration
    },
    playcount: {
      type: GraphQLString,
      resolve: response => response.playcount
    },
    url: {
      type: GraphQLString,
      resolve: response => response.url
    },
    artist: {
      type: ArtistType,
      resolve: response => response.artist
    }
  })
});



module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',

    fields: () => ({
      topartists: {
        type: new GraphQLList(ArtistType),
        args: {
          username: { type: GraphQLString },
          limit: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          request('user.gettopartists', args)
            .then(json => json.topartists.artist)
      },
      toptracks: {
        type: new GraphQLList(TrackType),
        args: {
          username: { type: GraphQLString },
          weekly: { type: GraphQLBoolean },
          limit: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          request(`user.${args.weekly ? 'getweeklytrackchart' : 'gettoptracks'}`, args)
            .then(json => json[args.weekly ? 'weeklytrackchart' : 'toptracks'].track)
      }
    })
  })
});
