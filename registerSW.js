if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/dmarc-xml-viewer/sw.js', { scope: '/dmarc-xml-viewer/' })})}