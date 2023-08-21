



document.addEventListener('DOMContentLoaded', async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

    if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum;

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); // Request access to user's accounts
            const currentAccount = accounts[0];
            
            console.log('Current Ethereum address:', currentAccount);

            ethereum.on('accountsChanged', newAccounts => {
                console.log('Accounts changed:', newAccounts);
                const updatedCurrentAccount = newAccounts[0];
                console.log('Updated Ethereum address:', updatedCurrentAccount);
            });

            ethereum.on('chainChanged', chainId => {
                console.log('Network changed:', chainId);
            });
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    } else {
        console.log('MetaMask or an Ethereum-compatible wallet is not installed.');
    }
});



       $(document).ready(function () {


            $('#department').DataTable({
                'serverside': true,
                'processing': true,
                'paging': true,
                "columnDefs": [
                    { "className": "dt-center", "targets": "_all" },
                ],
                'ajax': {
                    'url': 'deptbl.php',
                    'type': 'post',
                },
                'fnCreateRow': function (nRow, aData, iDataIndex) {
                    $(nRow).attr('id', aData[0]);
                },
            });
        });


       
        
        


        function AddDepartment() {
            $.ajax({
                url: 'add-department.php',
                method: 'POST',
                data: {
                    department1: $('#Department1').val(),
                },
                success: function (response) {
                    var data = JSON.parse(response);
                    if (data.status == 'data_exist') {
                        alert('Data already exists.');
                    } else if (data.status == 'success') {
                        var c = $('#department').DataTable().ajax.reload();
                        alert('Data added successfully.');
                        $.get('dept-dropdown.php', function (data) {
                            $('#Department').html(data);
                        });
                    } else {
                        alert('Failed to add data.');
                    }
                    $('#Department1').val('');
                },
                error: function (xhr, status, error) {
                    alert('Error: ' + error);
                }
            });
        }

        function Edit1(update1) {
            $('#hiddendata1').val(update1);
            $.post("update-department.php", { update1: update1 }, function (data,
                status) {
                var userid = JSON.parse(data);
                $('#Update_Department1').val(userid.dept_name);
                $('#Update_status1').val(userid.status);
            });
            $('#update_department').modal("show");
        }

        function update1() {
            var status1 = $('#Update_status1').val();
            var department1 = $('#Update_Department1').val();
            var hiddendata1 = $('#hiddendata1').val();

            $.post("update-department.php", {
                hiddendata1: hiddendata1, status1: status1, department1: department1
            }, function (data, status) {
                var jsons = JSON.parse(data);
                status = jsons.status;
                if (status == 'success') {
                    var update = $('#department').DataTable().ajax.reload();
                }
            });
        }
      