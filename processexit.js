var process = require("process")

var a = 0


// while (a == 0) {
//     console.log(`without using process.exit() !! animesh `);
// }
// animesh will be printing till we stop the code 

// lets use process.exit()

while (a == 0){
    console.log(`using process.exit() !! animesh`);

    process.exit(1)
}