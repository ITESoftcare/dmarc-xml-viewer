
export function getFakeData(dataLength) {
  dataLength = dataLength || 10;
  const fakeItems = new Array(dataLength).fill(0);
  return fakeItems;
}

export const toFirstCap = (params) => {
  var words = params.replace("_", " ").split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
};

export const formatedObj = (Arr, parent) => {
  let child = {};
  let records = [];
  Arr.map((obj) => {
    if (obj.children.length > 0) {
      const grandChildren = formatedObj(obj.children, records);
      if (obj.name == "record") {
        records.push(grandChildren);
      } else {
        child[obj.name] = grandChildren;
      }
    } else {
      if (obj.value && obj.children.length === 0) {
        child[obj.name] = obj.value;
      }
    }
  });
  if (!parent) {
    child["records"] = records;
  }
  return child;
};
