document.addEventListener("DOMContentLoaded", () => {
  const YourLink = document.getElementById("YourLink");
  const Button = document.getElementById("Button");
  const CopyToClipBoard = document.getElementById("CopyToClipboard");
  CopyToClipBoard.addEventListener("click", copyToClipboard);

  Button.addEventListener("click", short);
});

async function short() {
  const LinkToBeShortned = document.getElementById("LinkToBeShortned").value;
  const InputBar = document.getElementById("LinkToBeShortned");
  try {
    if (checkIfSiteHasHttp(LinkToBeShortned)) {
      const linkShorted = await fetch(
        `/.netlify/functions/short?link=${LinkToBeShortned}`
      ).then((res) => {
        return res.json();
      });

      InputBar.style.animation = "shake 1.5s ease-in-out normal";
      setTimeout(() => {
        InputBar.style.animation = "none";
        YourLink.innerText = linkShorted;
        CopyToClipboard.classList.remove("hidden");
      }, 1400);
    } else {
      if (LinkToBeShortned != "") {
        InputBar.style.animation = "shake 1.5s ease-in-out normal";
        setTimeout(() => {
          InputBar.style.animation = "none";
          CopyToClipboard.classList.add("hidden");
          YourLink.innerText = "Insert link with HTTP or HTTPS";
        }, 1400);
      } else {
        YourLink.innerText = "Add link first";
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function checkIfSiteHasHttp(link) {
  const LinkHasHTTPorHTTPS =
    link.startsWith("https://" || "http://") && link != "";

  return LinkHasHTTPorHTTPS;
}
//Work around to copy From Div.
function copyToClipboard() {
  const toCopy = document.getElementById("toCopy");
  const textToCopy = YourLink.innerText;
  toCopy.value = textToCopy;
  toCopy.select();
  navigator.clipboard.writeText(toCopy.value);
  toCopy.value = "";

  alert("Done!");
}
