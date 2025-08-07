const game = new Chess();

let board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  updateHistory();
  highlightLastMove(source, target);
}

function updateHistory() {
  const historyElement = document.getElementById("move-history");
  const history = game.history();
  historyElement.innerHTML = '';
  history.forEach((move, i) => {
    const li = document.createElement('li');
    li.textContent = move;
    historyElement.appendChild(li);
  });
}

function highlightLastMove(source, target) {
  document.querySelectorAll('.square-55d63').forEach(el => {
    el.style.boxShadow = '';
  });

  const sourceSquare = document.querySelector(`.square-${source}`);
  const targetSquare = document.querySelector(`.square-${target}`);

  if (sourceSquare) sourceSquare.style.boxShadow = 'inset 0 0 20px #00ffff';
  if (targetSquare) targetSquare.style.boxShadow = 'inset 0 0 20px #00ffff';
}

// Reset button
document.getElementById("reset-btn").addEventListener("click", () => {
  game.reset();
  board.position('start');
  document.getElementById("move-history").innerHTML = '';
  document.querySelectorAll('.square-55d63').forEach(el => {
    el.style.boxShadow = '';
  });
});
