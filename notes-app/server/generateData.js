var faker = require('faker');
var database = {
    books: [],
    sections: [],
    notes: []
};
var subjects = ["English", "Science", "Social", "Sanskrit", "Telugu", "Hindi"];
var minutes = ["20", "30", "40", "12", "10", "1", "7", "15", "5", "59"]
var tags = ["hindu", "rss", "bjp", "angular", "react", "faker", "json server", "ui", "css"]
var tagGroup = ["snippets", "how to", "design", "ui", "react", "angular", ""]

for (var i = 1; i <= 10; i++) {
    books.push({
        id: i,
        title: faker.commerce.productName(),
        content: faker.lorem.sentences(),
        about: faker.commerce.productDescription(),
        dd: "0",
        hh: "0",
        mm: minutes[faker.datatype.number() % 10],
        tags: tags[faker.datatype.number() % 6] ,
        duration: faker.commerce.price(),
        imageUrl: "https://source.unsplash.com/1600x900/?product",
        subject: subjects[faker.datatype.number() % 6]
    });
}

for (var i = 1; i <= 10; i++) {
    sections.push({
        id: i,
        title: faker.commerce.productName(),
        content: faker.lorem.sentences(),
        about: faker.commerce.productDescription(),
        dd: "0",
        hh: "0",
        mm: minutes[faker.datatype.number()%10],
        tags: tags[faker.datatype.number()%6]
    });
}

for (var i = 1; i <= 10; i++) {
    database.notes.push({
        id: i,
        title: faker.commerce.productName(),
        about: faker.commerce.productDescription(),
        content: faker.lorem.sentences(),
        dd: "0",
        hh: "0",
        mm: minutes[faker.datatype.number() % 10],
        tags: tags[faker.datatype.number() % 6]
    });
}

console.log(JSON.stringify(database));