let serverUrl = "https://ui3ssn5tf4kf.usemoralis.com:2053/server";
let appId = "O1YAAcq0awIqr2V39dLNSg7M4Gxvi9CBNiPYgM8k";
let contract_addr = "0xa2f502e20a1255e1913f739876f1c9f4135c224a"

Moralis.initialize(appId);
Moralis.serverURL = serverUrl;
Moralis.start({ serverUrl, appId});

let web3;

async function init() {
    let currentUser = Moralis.User.current();
    if (!currentUser) {
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enable();

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
}

async function transfer() {
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    const options = {type: "erc1155",
                     receiver: address,
                     contract_address: contract_addr,
                     token_id: tokenId.toString(),
                     amount: amount}
    let result = await Moralis.transfer(options);
    console.log(result);
}

document.getElementById("submit_transfer").onclick = transfer;

init();