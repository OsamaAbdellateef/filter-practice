export default function Button() {
  return <button>Save</button>;
}

function filterFun(arr, fn) {
  const filteredArr = [];
  for (let i = 0; i < arr.len1gth; i++) {
    if (fn(arr[i], i)) {
      filteredArr.push(arr[i]);
    }
  }
  return filteredArr;
}
