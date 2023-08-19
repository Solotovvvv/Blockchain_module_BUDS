

let contract;
let currentAccount;

document.addEventListener('DOMContentLoaded', async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

    if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum;

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0]; // Assign to the higher-scoped variable
            
            console.log('Current Ethereum address:', currentAccount);

            const contractAddress = '0x667aCBb84e25D00Cc330074D392A200E0b02F9d6';
            const contractAbi =  [      {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "hash",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "name": "companyName",
                  "type": "string"
                },
                {
                  "indexed": false,
                  "name": "duration",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "ContractRegistered",
              "type": "event"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "companyName",
                  "type": "string"
                },
                {
                  "name": "duration",
                  "type": "uint256"
                }
              ],
              "name": "registerContract",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "hash",
                  "type": "bytes32"
                }
              ],
              "name": "getContractInfo",
              "outputs": [
                {
                  "name": "",
                  "type": "string"
                },
                {
                  "name": "",
                  "type": "uint256"
                },
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            } ];

            contract = new web3.eth.Contract(contractAbi, contractAddress);

            ethereum.on('accountsChanged', newAccounts => {
                console.log('Accounts changed:', newAccounts);
                currentAccount = newAccounts[0]; // Update the higher-scoped variable
                console.log('Updated Ethereum address:', currentAccount);
            });

            ethereum.on('chainChanged', chainId => {
                console.log('Network changed:', chainId);
            });

            // DataTable initialization
            $('#approvedDepartment').DataTable({
                'serverSide': true, // Corrected spelling
                'processing': true,
                'paging': true,
                "columnDefs": [
                    { "className": "dt-center", "targets": "_all" },
                ],
                'ajax': {
                    'url': 'approvedtbl.php',
                    'type': 'post',
                },
                'fnCreateRow': function (nRow, aData, iDataIndex) {
                    $(nRow).attr('id', aData[0]);
                },
            });
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    } else {
        console.log('MetaMask or an Ethereum-compatible wallet is not installed.');
    }
});

function Edit2(update) {
    $('#hiddendata2').val(update);
    $.post("update_blockchain.php", { update: update }, function (data, status) {
        var userid1 = JSON.parse(data);
        $('#Update_Name').val(userid1.name);
    });
    $('#update_department').modal("show");
}

function update2() {
    const updateData = {
        name: $('#Update_Name').val(),
        duration: $('#Update_Duration').val(),
        // ... other data you want to update
    };

    contract.methods.registerContract(updateData.name, parseInt(updateData.duration))
        .send({ from: currentAccount })
        .on('transactionHash', (hash) => {
            console.log('Transaction Hash:', hash);
        })
        
        .on('confirmation', (confirmationNumber, receipt) => {
            if (confirmationNumber === 1) {
                console.log('Transaction Confirmed:', receipt);
                // Refresh the DataTable or update UI as needed
            }
        })
        .on('error', (error) => {
            console.error('Transaction Error:', error);
        });

    $('#update_department').modal('hide');
}
