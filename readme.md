<set node env>
    NODE_ENV=development nodemon server.js
<brew command not found>
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
<eslint and helper plugins>
    eslint
    prettier
    esling-config-prettier // this disables the formatting of eslint
    eslint-plugin-prettier // shows the formatting errors
    eslint-config-airbnb // for js style guide
    eslint-plugin-node // eslint rules for only node

    // below for airbnb working

    eslint-plugin-import
    eslint-plugin-jsx-a11y
    eslint-plugin-react

    --save-dev

<Installing mongodb comunity server locally>
-> dowload the files
-> extract
-> copy all files to /usr/local/bin using "sudo cp <all files here> /usr/local/bin"
-> make a folder where db will store data using "sudo mkdir /data/db"
-> give permissions to this using "sudo chown -R `id -un` /data/db
-> run mongo using "mongod"

<Mongo commands>
-> start local server "mongod"
-> to start mongo shell "mongo"
<switch or create>
user dbname
<crate collection and insert more then one>
db.collectionName.insertMany({test: "test" name: "test123"}, {test: "test" name: "test"})
<create collection and insert one>
db.collectionName.insertOne({test: "test" name: "test123"})
<read all documents/records>
db.collectionName.find()
<read single document>
db.collectionName.find({name: "name here"})
<find with less than >
db.collectionName.find({price : {$lt: 5000}})
<less than equal to>
db.collectionName.find({price : {$lte : 5000}})
<find with AND operator >
db.collectionName.find({price : {$lte : 5000}, rating: {$gte: 4.8}})
<use $gt for greater than $gte for greater than equal to>

<Using OR operator>
db.collectionName.find({ $or: [{price: {$lt: 5000}}, rating: {$gte: 4.8}]})
