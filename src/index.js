const { GraphQLServer } = require("graphql-yoga");
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: () => `This is the API of a Hackernews Clone`
  },
  Mutation: {
    post: (parent, { description, url }) => {
      const link = {
        id: `link-${idCount}`,
        description: description,
        url: url
      };
      links.push(link);
      idCount++;
      return link;
    },
    deleteLink: (parent, { id }) => {
      links = links.filter(el => el.id !== id);
      return id;
    },
    updateLink: (parent, { id, url, description }) => {
      links.map(el => {
        if (el.id === id) {
          el.url = url ? url : el.url;
          el.description = description ? description : el.description;
        }
      });
      return "you updated link lol ";
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
