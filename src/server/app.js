const express = require("express")
const cors = require("cors")
const { json } = require("body-parser")
const fs = require("fs")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const parse = require("csv-parse/lib/sync")

const app = express().use(cors()).use(json())

const schema = buildSchema(fs.readFileSync("schema.graphql", "utf8"))
const characters = parse(fs.readFileSync("characters.csv", "utf8"), {
	columns: true,
})

const root = {
	characters: (args) => {
		return {
			count: characters.length,
			characters: characters.slice(args.offset, args.offset + args.limit),
		}
	},
	character: (args) => {
		return characters.find((ch) => ch.name === args.name)
	},
}

app.use(
	"/",
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true,
	})
)

app.listen(4201, (err) => {
	if (err) {
		return console.log(err)
	}
	return console.log("Server listening on port 4201")
})
