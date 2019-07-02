const { prisma } = require("./generated/prisma-client");

async function main() {
  // Create a new link
  const newLink = await prisma.createLink({
    url: "http://localhost:4466",
    description: "Prisma replaces traditional ORMs"
  });
  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

  // Read all links from the database and print them to the console
  const allLinks = await prisma.links();
  console.log(allLinks);
}

main().catch(e => console.error(e));
