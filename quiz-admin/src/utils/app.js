export const downloadTheApp = () => {
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    window.location.href = "itms-apps://itunes.apple.com/app/lobang/id6446956409?mt=8";
  } else if (navigator.userAgent.match(/Android/i)) {
    window.location.href = "market://details?id=com.lobang";
  } else {
    window.location.href = "https://apps.apple.com/us/app/lobang/id6446956409";
  } 
};
