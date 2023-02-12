import React, { useState, useEffect } from "react";

function Demo({ file }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const xmlFile = new XMLHttpRequest();
    xmlFile.open("GET", file, false);
    xmlFile.send();

    const parseXml = (xml) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");
      const obj = {};
      if (xmlDoc.nodeType === 1) {
        if (xmlDoc.attributes.length > 0) {
          obj["@attributes"] = {};
          for (let j = 0; j < xmlDoc.attributes.length; j++) {
            const attribute = xmlDoc.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xmlDoc.nodeType === 3) {
        obj = xmlDoc.nodeValue;
      }
      if (
        xmlDoc.hasChildNodes() &&
        xmlDoc.childNodes.length === 1 &&
        xmlDoc.childNodes[0].nodeType === 3
      ) {
        obj = xmlDoc.childNodes[0].nodeValue;
      } else if (xmlDoc.hasChildNodes()) {
        for (let i = 0; i < xmlDoc.childNodes.length; i++) {
          const item = xmlDoc.childNodes.item(i);
          const nodeName = item.nodeName;
          if (typeof obj[nodeName] === "undefined") {
            obj[nodeName] = parseXml(item);
          } else {
            if (typeof obj[nodeName].push === "undefined") {
              const old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(parseXml(item));
          }
        }
      }
      return obj;
    };

    setData(parseXml(xmlFile.responseText));
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Demo;
