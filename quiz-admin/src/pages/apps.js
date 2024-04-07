import React, { useEffect } from "react";

export default function Apps() {
  useEffect(() => {
    //if android open android and if ios open ios
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      window.location.href = "itms-apps://itunes.apple.com/app/lobang/id6446956409?mt=8";

    } else if (navigator.userAgent.match(/Android/i)) {
      window.location.href = "market://details?id=com.lobang";
    }
  }, []);

  return <div>Redirecting you to the appstore</div>;
}
