<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          Chinese Checkers Solver.
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button @click="startBtn">Solve</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-spinner v-if="!loaded" label="Loading"></b-spinner>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>

export default {
  name: 'App',
  data: function() {
    return {
      loaded: true,
      won: false,
      grid: [['X','X','0','0','0','X','X'],
             ['X','X','0','0','0','X','X'],
             ['0','0','0','0','0','0','0'],
             ['0','0','0','1','0','0','0'],
             ['0','0','0','0','0','0','0'],
             ['X','X','0','0','0','X','X'],
             ['X','X','0','0','0','X','X']],
    }
  },
  created: function() {
    this.loaded = true;
  },
  methods: {
    startBtn : function() {
      this.loaded = false;
      this.mainLoop(this.grid, 0);
    },
    mainLoop: function(board, timesCalled) {
      timesCalled++;
      if(timesCalled % 1000 === 0) {
        console.log('called ' + timesCalled + ' times.');
      }
      //check for win state
      let filledIn = this.countFilledInCells(board);
      if(filledIn === 32) {
        console.log("WIN");
        console.log(board);
        this.won = true;
        this.loaded = true;
      }
      // loop through each currently existing '1' on the board recursively
      if(!this.won) {
        let self = this;
        board.forEach(function (row, indexX) {
          row.forEach(function (col, indexY) {
            if (board[indexX][indexY] === '1') {
              if (self.checkDirectionWithMove('L', board, indexX, indexY)) {
                self.doSingleMove(board, 'L', indexX, indexY, timesCalled);
              }
              if (self.checkDirectionWithMove('U', board, indexX, indexY)) {
                self.doSingleMove(board, 'U', indexX, indexY, timesCalled);
              }
              if (self.checkDirectionWithMove('R', board, indexX, indexY)) {
                self.doSingleMove(board, 'R', indexX, indexY, timesCalled);
              }
              if (self.checkDirectionWithMove('D', board, indexX, indexY)) {
                self.doSingleMove(board, 'D', indexX, indexY, timesCalled);
              }
            }
          });
        });
      }
      console.log('dead-end at: ' + filledIn);
    },
    doSingleMove: function(board, direction, row, col, timesCalled) {
      let boardCopy = this._.cloneDeep(board);
      this.doDirectionWithMove(direction, boardCopy, row, col);
      this.mainLoop(boardCopy, timesCalled);
    },
    // just check if it's valid to move
    checkDirectionWithMove : function(direction, board, x,y) {
      if(direction === 'L') {
        if(x - 2 >= 0) {
          if (board[x - 1][y] === '0' && board[x - 2][y] === '0') {
            return true;
          }
        }
        return false;
      } else if(direction === 'U') {
        if(y - 2 >= 0) {
          if (board[x][y-1] === '0' && board[x][y-2] === '0') {
            return true;
          }
        }
        return false;
      } else if(direction === 'R') {
        if(x + 2 <= 6) {
          if (board[x+1][y] === '0' && board[x+2][y] === '0') {
            return true;
          }
        }
        return false;
      } else {
        if(y + 2 <= 6) {
          if (board[x][y+1] === '0' && board[x][y+2] === '0') {
            return true;
          }
        }
        return false;
      }
    },
    doDirectionWithMove : function(direction, board, x,y) {
      board[x][y] = '0';
      if(direction === 'L') {
        board[x - 1][y] = '1';
        board[x - 2][y] = '1';
      } else if(direction === 'U') {
        board[x][y-1] = '1';
        board[x][y-2] = '1';
      } else if(direction === 'R') {
        board[x+1][y] = '1';
        board[x+2][y] = '1';
      } else {
        board[x][y+1] = '1';
        board[x][y+2] = '1';
      }
      return board;
    },
    countFilledInCells : function(board) {
      let counter = 0;
      board.forEach(function (row, indexX) {
        row.forEach(function (col, indexY) {
          if(board[indexX][indexY] === '1') {
            counter++;
          }
        });
      });
      return counter;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
