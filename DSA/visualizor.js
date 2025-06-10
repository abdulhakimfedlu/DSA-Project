let arr = [];
function generateArray() {
    arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    drawArray();
}
function drawArray() {
    const container = document.getElementById("container");
    container.innerHTML = "";
    arr.forEach((val) => {
        const bar = document.createElement("div");
        bar.style.height = `${val * 3}px`;
        bar.className = "bar";
        container.appendChild(bar);
    });
}

async function bubbleSort() {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                drawArray();
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }
    }
}

async function quickSort(left, right) {
    if (left >= right) return;
    let pivot = arr[right];
    let partitionIndex = left;
    for (let i = left; i < right; i++) {
        if (arr[i] < pivot) {
            [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
            partitionIndex++;
        }
    }
    [arr[partitionIndex], arr[right]] = [arr[right], arr[partitionIndex]];
    drawArray();
    await new Promise((resolve) => setTimeout(resolve, 200));
    await quickSort(left, partitionIndex - 1);
    await quickSort(partitionIndex + 1, right);
}

async function insertionSort() {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            drawArray();
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        arr[j + 1] = key;
        drawArray();
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

async function selectionSort() {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        drawArray();
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

async function heapSort() {
    function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            drawArray();
            setTimeout(() => heapify(n, largest), 100);
        }
    }
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) heapify(arr.length, i);
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        drawArray();
        await new Promise((resolve) => setTimeout(resolve, 100));
        heapify(i, 0);
    }
}

async function mergeSort(left, right) {
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    let merged = [...arr.slice(left, mid + 1), ...arr.slice(mid + 1, right + 1)].sort((a, b) => a - b);
    arr.splice(left, merged.length, ...merged);
    drawArray();
    await new Promise((resolve) => setTimeout(resolve, 200));
}

generateArray();
