function createGrid() {
  let currentFile = 1;
  let result = [];
  for (let i = 0; i < 10; i++) {
    const gridFile = [];
    for (let j = 1; j <= 10; j++) {
      gridFile.push({ x: j, y: currentFile, isHitted: false });
    }
    currentFile++;
    result = result.concat(gridFile);
  }
  return result;
}
const grid = createGrid();
