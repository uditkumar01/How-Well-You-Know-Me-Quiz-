var readlineSync = require("readline-sync");
var chalk = require("chalk");
var fetch = require("node-fetch");

// const Database = require("@replit/database")
// const db = new Database()

// console.clear();
console.log(chalk.hex('#fff200')(`

░██████╗░██╗░░░██╗██╗███████╗
██╔═══██╗██║░░░██║██║╚════██║
██║██╗██║██║░░░██║██║░░███╔═╝
╚██████╔╝██║░░░██║██║██╔══╝░░
░╚═██╔═╝░╚██████╔╝██║███████╗
░░░╚═╝░░░░╚═════╝░╚═╝╚══════╝


`)+chalk.red.bold("ⲎⲞⲰ  ")+chalk.green("Ⲱ Ⲉ𝓛𝓛 ⲆⲞ ⲨⲞ𝓤 ")+chalk.hex('#18dcff')("ⲔⲚⲞⲰ ⲘⲈ ?\n\n"));
var name = readlineSync.question(chalk.hex('#1B9CFC').bold("Hi, what's your name?\n"));
console.clear()
console.log(chalk.green.bold("Hi, "+name+ " let's see how well do you know me...\n\n"));
var points = 0, count = 0;
function ask(question,ans){
  count++;
  console.log("\n\n"+chalk.hex('#fff200').bold(points+" ☢\n"));
  var answer = readlineSync.question(chalk.hex('#1B9CFC').bold(question+" ")+chalk.hex('#57606f').bold("(Hint: Begins with '")+chalk.hex('#ced6e0').bold(ans.substring(0,1).toUpperCase())+chalk.hex('#57606f').bold("')\n")+chalk.hex('#1B9CFC').bold("=> "));
  
  console.log();
  

  if(answer.toLowerCase()===ans){
    points++;
    console.log(chalk.green.bold(answer+" ✓"));
  }
  else{
    console.log(chalk.red.bold(answer+" ✘"));}
  
  if(count==5){
    if(points >= 3){
      console.log(chalk.green.bold("\n🏆\tCongrats, "+name+" you scored "+points+" points.\n"));
      
      
      
    }
    else{

      
      console.log(chalk.red.bold("\nOops, "+name+" you scored "+points+" points. Try again to score better.\n"));

      

      

    }
  var data = {"name": name, "points": points, "user_type": "hwdykmq"};
  // console.log(JSON.stringify(data));
  fetch("https://quiz-score.herokuapp.com/save_user", {
    method: "POST", 
    body: JSON.stringify(data)
  }).then(response => response.json()).then(function leaderboard(json){
    var colors = ['#f1c40f','#ecf0f1','#e77f67','#f78fb3','#3dc1d3'];
    console.log(chalk.hex('#c44569').bold("\nYour Rank: "+json.rank+"\n"));
    console.log(chalk.hex('#596275').bold("\n------------------------"));
    console.log(chalk.yellow.bold("\n------Leader Board------\n"));
    for(var i=0;i<json.data.length;i++){
      var nameLen = json.data[i].name.length;
      var username = json.data[i].name
      if (nameLen > 17){
        username = username.substring(0,14)+"...";
        nameLen = 17;
      }
      // console.log(nameLen,name,nameLen>17);
      var noOfSpaces = 20 - nameLen;
      console.log(chalk.hex(colors[i]).bold((i+1)+'. '+username+" ".repeat(noOfSpaces)+json.data[i].points));
    }
    console.log(chalk.hex('#596275').bold("\n------------------------\n"));
  });

  }
  else{
    
    readlineSync.question(chalk.hex('#1B9CFC').bold("\nPress Enter to continue...\n"));
    console.clear();
  }
  
}
ask("Where belong to which country?","india");
ask("Tell me about my favourite sport?","football");
ask("What is my nickname","udit");
ask("Tell me about my favourite song?","hall of fame");
ask("Tell me about my favourite singer?","ed sheeran");
// var name = readlineSync.question();
// console.log(chalk.red.bold("Hi, "));