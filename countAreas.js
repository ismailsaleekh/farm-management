const parseMatrix = (input) => {
    return input.split(';').map(row => row.split(',').map(Number));
};

const countAreas = (matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let areaCount = 0;

    const blackList = new Map();
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const isOutOfBounds = (x, y) => {
        const outOfXBound = x < 0 || x >= rows;
        const outOfYBound = y < 0 || y >= cols;

        return outOfXBound || outOfYBound;
    };

    const isValid = (x, y) => {
        const key = `${x}:${y}`;

        return !isOutOfBounds(x, y) && matrix[x][y] === 1 && !blackList.get(key);
    };

    const lookup = (x, y) => {
        const stack = [[x, y]];

        while (stack.length) {
            const [cx, cy] = stack.pop();

            if (!isValid(cx, cy)) continue;

            blackList.set(`${cx}:${cy}`, true);

            directions.forEach(([dx, dy]) => stack.push([cx + dx, cy + dy]));
        }
    };

    matrix.forEach((row, i) => row.forEach((cell, j) => {
        if (cell === 1 && !blackList.get(`${i}:${j}`)) {
            areaCount++;
            lookup(i, j);
        }
    }));

    return areaCount;
};


const tests = [
    { input: '1,0,1;0,1,0', expected: 3 },
    { input: '1,0,0;0,1,0;0,0,1', expected: 3 },
    { input: '1,1,1;0,0,0;1,1,1', expected: 2 },
    { input: '1,1,0,0;0,1,1,0;0,0,0,1;1,0,1,1', expected: 3 },
    { input: '1,0,1,0;0,1,0,1;1,0,1,0;0,1,0,1', expected: 8 },
    { input: '1,1,1;1,1,1;1,1,1', expected: 1 },
    { input: '0,0,0;0,0,0;0,0,0', expected: 0 },
    { input: '1,0,1,0;1,1,0,1;0,0,1,1;1,1,1,0', expected: 3 },
    { input: '1,0,1;1,1,0;0,1,1', expected: 2 },
    { input: '1,1,0,0;1,1,0,0;0,0,1,1;0,0,1,1', expected: 2 }
];

tests.forEach((test, index) => {
    const matrix = parseMatrix(test.input);
    const result = countAreas(matrix);
    console.log(`Test ${index + 1}`);
    console.log(`Input: ${test.input}`);
    console.log(`Expected Output: ${test.expected}`);
    console.log(`Actual Output: ${result}`);
    console.log(`Test ${index + 1} ${result === test.expected ? 'Passed' : 'Failed'}`);
    console.log('---');
});