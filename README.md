JS Grid Game Mechanic : Implementation and Thought Process

--------------------------------------------------------------

Simple iteration through all the grid (iteration by index) lets find all elements of defined type on the board, but it:
    1) Can't define elements of the same type nearby and delete all same elements through board
    2) Ineffective: such algorithm would check every cell on board

So, I found more effective way - Flood Fill (Breadth-First Search). This algorithm lets think about task in context of graph theory and checks only nearby cells(flows from start point throug all graph vertexes) which is quite suitable for games of such type on my opinion. Also, program would "visit" only group cells, so algorithm complexity depends only on quantity of elements - O(K). Also, my realization of this task is quite flexible (for example, you can easily switch to another coordinates to switch the mechanics of elements destroying).

---------------------------------------------------------------------------

Technical features:
1) Object oriented approach (Board rules the state of the board, generates grid and containes groups' searching logic and Cell is separated object which "knows" own coordinates, type and is responsible for itself vizualisation and disappearing animation);
2) Coordinate system [r, c] - I used it (r is for row and c is for col) instead of x, y to avoid confusion with two-dimensional arrays, used for working with canvas;
3) Algorithm compares .type property of objects in memory instead of text in DOM-elements to avoid situation where browser automatically converts HTML-entities into symbols.

-----------------------------------------------------------------------------

How to launch:
1) use live-server extension of VS Code for launching index.html (or some other live servers if you don't use VS Code);
2) I left console.log in code after debbuging for possibility to check logs of BFS algorithm, so you can open console in debugging tools of the browser to check it
