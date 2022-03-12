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
    let accounts = await web3.eth.getAccounts();
    console.log(accounts)

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];
}

async function mint() {
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    console.log(tokenId)
    console.log(address)
    console.log(amount)

    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractAbi, contract_addr);

    console.log(accounts[0])
    console.log(contract)

    contract.methods.mint(address, tokenId, amount).send({from: accounts[0], value: 0})
    .on("receipt", function(receipt) {
        alert("Mint done!")
    })
}

document.getElementById("submit_mint").onclick = mint;

init();