let allgraphs = [];
let graph = [];

// for (let i = 1; i <= 100; i++) {
//   let row = [];
//   for (let j = 1; j <= 26; j++) {
//     let col = [];
//     row.push(col);
//   }
//   graph.push(row);
// }

let allindegrees = [];
let indegree = [];

// for (let i = 0; i < 100; i++) {
//   indegree[i] = [];
//   for (let j = 0; j < 26; j++) {
//     indegree[i][j] = 0;
//   }
// }

function isCycle() {

  let indeg = JSON.parse(JSON.stringify(indegree)); 
  let que = [];
  let ans = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 26; j++) {
        if(indeg[i][j] === 0)
            que.push(i * 26 + j);
    }
  }

  while (que.length !== 0) {
    let size = que.length;
    while (size-- > 0) {
      let rv = que.shift();
      ans.push(rv);
      for (let ele of graph[Math.floor(rv / 26)][rv%26]) {
        if (--indeg[ele[0]][ele[1]] === 0) que.push(ele[0] * 26 + ele[1]);
      }
    }
  }
  if (ans.length === 2600) return true;
  return false;
}
