window.isAuthenticated = false;
window.identity = {};
window.token = '';

let b64DecodeUnicode = str =>
  decodeURIComponent(
    Array.prototype.map.call(atob(str), c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''))

let parseJwt = token =>
  JSON.parse(
    b64DecodeUnicode(
      token.split('.')[1].replace('-', '+').replace('_', '/')
    )
  )

function handleCredentialResponse(response) {
    window.token = response.credential;
    window.identity = parseJwt(response.credential);
    window.isAuthenticated = true;
    showAuthInfo();
}

function showAuthInfo() {
    console.log(window.identity)
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "769622060814-slsc9skskd5cfs3tu6uuiliovj719caf.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: true,
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}