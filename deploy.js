// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm} = require('./compile');

const provider = new HDWalletProvider(
    'also together hazard proud lenght danger extend filter knee mirror retire blush', 
    'https://goerli.infura.io/v3/21f9a5c03798423788425a91fe5bb3ec'
)

const web3 = Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Deploying from account: ', accounts[0]);

    const deployedContract = await new web3.eth.Contract(abi)
    .deploy({
        data: evm.bytecode.object,
        arguments: ['Halo']
    })
    .send({from: accounts[0], gas: '10000000'})

    console.log('Contract address: ', deployedContract.options.address);
    provider.engine.stop();
}

deploy();