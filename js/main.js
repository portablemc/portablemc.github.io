const main = async () => {
  const btn = await initDownloadButton('#download-btn', {
    url: 'https://api.github.com/repos/portablemc/portablemc/releases/latest'
  });
  console.log(`Initialized: #${btn.id}`);
};

const initDownloadButton = async (btn, options) => {
  if (typeof btn === 'string') btn = document.querySelector(btn);
  const downloadUrl = await fetchLatestDownloadUrl(options.url);
  btn.addEventListener('click', () => {
    console.log(`Opening: ${downloadUrl}`);
    window.open(downloadUrl, '_blank')
  });
  return btn;
};

const fetchLatestDownloadUrl = async (url) => {
  const response = await fetch(url);
  const { assets: [ { browser_download_url } ] } = await response.json();
  return browser_download_url;
}

main();