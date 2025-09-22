// Part 2: JavaScript Functions - Scope, Parameters & Return Values

// Global variables
const chessPieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
let animationInterval;

// Function with parameters and return value
function calculateMaterialAdvantage(whitePieces, blackPieces) {
    const pieceValues = {
        '♔': 0, '♚': 0, // Kings have no point value
        '♕': 9, '♛': 9,
        '♖': 5, '♜': 5,
        '♗': 3, '♝': 3,
        '♘': 3, '♞': 3,
        '♙': 1, '♟': 1
    };
    
    let whiteScore = 0;
    let blackScore = 0;
    
    // Calculate white's material
    whitePieces.forEach(piece => {
        whiteScore += pieceValues[piece] || 0;
    });
    
    // Calculate black's material
    blackPieces.forEach(piece => {
        blackScore += pieceValues[piece] || 0;
    });
    
    // Return the difference (positive if white is ahead, negative if black is ahead)
    return whiteScore - blackScore;
}

// Function demonstrating local scope
function setupChessBoard() {
    const board = document.getElementById('chessBoard');
    board.innerHTML = '';
    
    const pieces = [
        '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
        '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
        '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
    ];
    
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        square.className = `chess-square ${(Math.floor(i / 8) + i % 8) % 2 === 0 ? 'light' : 'dark'}`;
        
        if (pieces[i]) {
            square.textContent = pieces[i];
            square.dataset.piece = pieces[i];
            
            // Add click event to show possible moves
            square.addEventListener('click', function() {
                showPossibleMoves(this, pieces[i]);
            });
        }
        
        board.appendChild(square);
    }
    
    // Demonstrate material calculation
    const whitePieces = pieces.filter(p => p && p === p.toUpperCase());
    const blackPieces = pieces.filter(p => p && p === p.toLowerCase());
    const advantage = calculateMaterialAdvantage(whitePieces, blackPieces);
    
    console.log(`Material advantage: ${advantage} (${advantage > 0 ? 'White' : 'Black'} is ahead)`);
}

// Function with parameters to show possible moves
function showPossibleMoves(square, piece) {
    // Reset all squares first
    document.querySelectorAll('.chess-square').forEach(sq => {
        sq.style.backgroundColor = '';
        sq.style.boxShadow = '';
    });
    
    // Highlight clicked square
    square.style.backgroundColor = '#e67e22';
    square.style.boxShadow = '0 0 15px rgba(230, 126, 34, 0.7)';
    
    // Based on the piece type, highlight possible moves
    const index = Array.from(square.parentNode.children).indexOf(square);
    const row = Math.floor(index / 8);
    const col = index % 8;
    
    // This is a simplified version - real chess rules would be more complex
    switch(piece) {
        case '♙': // White pawn
            highlightSquare(row - 1, col, '#16a085');
            break;
        case '♟': // Black pawn
            highlightSquare(row + 1, col, '#16a085');
            break;
        case '♘': // White knight
        case '♞': // Black knight
            highlightKnightMoves(row, col);
            break;
        case '♕': // White queen
        case '♛': // Black queen
            highlightQueenMoves(row, col);
            break;
        default:
            // For other pieces, just highlight a few squares as an example
            highlightSquare(row - 1, col - 1, '#16a085');
            highlightSquare(row - 1, col + 1, '#16a085');
            highlightSquare(row + 1, col - 1, '#16a085');
            highlightSquare(row + 1, col + 1, '#16a085');
    }
}

// Helper functions with local scope
function highlightSquare(row, col, color) {
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        const index = row * 8 + col;
        const squares = document.querySelectorAll('.chess-square');
        if (squares[index]) {
            squares[index].style.backgroundColor = color;
        }
    }
}

function highlightKnightMoves(row, col) {
    const moves = [
        [row - 2, col - 1], [row - 2, col + 1],
        [row - 1, col - 2], [row - 1, col + 2],
        [row + 1, col - 2], [row + 1, col + 2],
        [row + 2, col - 1], [row + 2, col + 1]
    ];
    
    moves.forEach(move => {
        highlightSquare(move[0], move[1], '#16a085');
    });
}

function highlightQueenMoves(row, col) {
    // Horizontal and vertical
    for (let i = 0; i < 8; i++) {
        if (i !== col) highlightSquare(row, i, '#16a085');
        if (i !== row) highlightSquare(i, col, '#16a085');
    }
    
    // Diagonals
    for (let i = 1; i < 8; i++) {
        highlightSquare(row + i, col + i, '#16a085');
        highlightSquare(row + i, col - i, '#16a085');
        highlightSquare(row - i, col + i, '#16a085');
        highlightSquare(row - i, col - i, '#16a085');
    }
}

// Part 3: Combining CSS Animations with JavaScript

// Function to start piece animation
function animatePieces() {
    const pieces = document.querySelectorAll('.chess-piece');
    let scale = 1;
    
    clearInterval(animationInterval);
    
    animationInterval = setInterval(() => {
        scale = scale === 1 ? 1.3 : 1;
        
        pieces.forEach(piece => {
            piece.style.transform = `scale(${scale})`;
            piece.style.transition = 'transform 0.5s ease';
        });
    }, 500);
}

// Function to reset animation
function resetAnimation() {
    clearInterval(animationInterval);
    
    document.querySelectorAll('.chess-piece').forEach(piece => {
        piece.style.transform = '';
        piece.style.transition = '';
    });
}

// Function to flip card
function flipCard() {
    const card = document.getElementById('flipCard');
    card.classList.toggle('flipped');
}

// Function to show modal with article content
function showArticle(articleId) {
    const modal = document.getElementById('articleModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    // Set content based on article ID
    switch(articleId) {
        case 'kings-gambit':
            title.textContent = "Mastering the King's Gambit";
            content.innerHTML = `
                <p>The King's Gambit is a bold opening that begins with 1.e4 e5 2.f4. By offering a pawn sacrifice, 
                White aims to seize control of the center and launch a rapid attack against Black's position.</p>
                <h3>Main Variations</h3>
                <ul>
                    <li>Accepted Variation: 2...exf4</li>
                    <li>Declined Variation: 2...Bc5</li>
                    <li>Falkbeer Countergambit: 2...d5</li>
                </ul>
                <p>Study these lines to add this aggressive weapon to your repertoire!</p>
            `;
            break;
        case 'sicilian-defense':
            title.textContent = "Sicilian Defense: Dragon Variation";
            content.innerHTML = `
                <p>The Dragon Variation is one of the most aggressive and theoretical lines in the Sicilian Defense. 
                It arises after the moves: 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6</p>
                <h3>Key Ideas</h3>
                <ul>
                    <li>Black fianchettoes the bishop to g7, controlling the long diagonal</li>
                    <li>Both sides castle on opposite sides, leading to attacking races</li>
                    <li>The famous Yugoslav Attack is White's main response: 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 9.Bc4</li>
                </ul>
            `;
            break;
        case 'endgame-techniques':
            title.textContent = "Essential Endgame Techniques";
            content.innerHTML = `
                <p>Mastering endgames is crucial for converting advantages into victories. Here are key techniques:</p>
                <h3>Fundamental Principles</h3>
                <ul>
                    <li>King Activation: In endgames, the king becomes a strong piece</li>
                    <li>Passed Pawns: Creating and advancing passed pawns is often decisive</li>
                    <li>Opposition: A key concept in king and pawn endgames</li>
                    <li>Zugzwang: Forcing your opponent to make a detrimental move</li>
                </ul>
                <p>Practice basic checkmates (K+Q vs. K, K+R vs. K) until they become automatic.</p>
            `;
            break;
        default:
            title.textContent = "Article Not Found";
            content.innerHTML = `<p>The requested article could not be found. Please try another one.</p>`;
    }
    
    modal.classList.add('active');
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('articleModal');
    modal.classList.remove('active');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Setup chess board
    setupChessBoard();
    
    // Add event listeners
    document.getElementById('exploreBtn').addEventListener('click', function() {
        document.querySelector('.blog-posts').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('pulseBtn').addEventListener('click', animatePieces);
    document.getElementById('resetBtn').addEventListener('click', resetAnimation);
    document.getElementById('flipCard').addEventListener('click', flipCard);
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Add event listeners to read more buttons
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            showArticle(this.dataset.article);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('articleModal');
        if (event.target === modal) {
            closeModal();
        }
    });
});