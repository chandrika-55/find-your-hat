const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const arr = [
    [pathCharacter,  fieldCharacter,  hole],
    [fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, fieldCharacter,fieldCharacter,hat]
  ]
    
    class Field {
        constructor(field, x = 0) {
         this.field = field.map(line => line.join('')).join('\n'); 
         this.userPosition = x;    
        } 
    
        print() {
          process.stdout.write(this.field);
        }    
        
        replaceAt(position, newCharacter) {
          const str = this.field;
          return str.substring(0, position) + newCharacter + str.substring(position + 1);
        }
    
        checkWin (userPosition) {   
            let symbol = this.field[userPosition] ;    
            if (symbol == hat) { 
              process.stdout.write(`\n Congrats! You found your hat ! \n`);          
              process.exit();
            }
            else if (symbol == hole) {          
              process.stdout.write(`\n You fell into a whole\n`);            
              process.exit();
            }
            else if (symbol !== fieldCharacter) {           
              process.stdout.write(`\n You are out of bounds \n`);          
              process.exit();
            }
            else {
              this.replaceAt(userPosition, pathCharacter)                 
              this.play();
            }
          
        }
    
        handleInput (userInput) {
          const char = userInput.toString().trim();                  
          if (char === 'U' || char === 'u') {
            this.userPosition = this.userPosition - 4;        
            this.checkWin(this.userPosition);
          }
          else if (char === 'D' || char === 'd') {
            this.userPosition = this.userPosition + 4;
            process.stdout.write('\n' + this.userPosition + '\n');
            this.checkWin(this.userPosition);
          }
          else if (char === 'R' || char === 'r') {
            this.userPosition = this.userPosition + 1;
            process.stdout.write('\n' + this.userPosition + '\n'); 
            this.checkWin(this.userPosition);
          }
          else if (char === 'L' || char === 'l') {
            this.userPosition = this.userPosition - 1;
            this.checkWin(this.userPosition);
          } 
          else {
            process.stdout.write('U is up, D is down, R is right, L is left \n');
          }
        }
    
        play() {
          this.print();
          process.stdout.write('\n Which way?  ')
          process.stdin.on('data', e => this.handleInput(e))
        }
      }
     
     const gameFiled = new Field(arr);
     
     gameFiled.play();
    