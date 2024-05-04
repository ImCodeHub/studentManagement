var totalCount = 0;

document.addEventListener('DOMContentLoaded', function () {
    // Place your code here
    document.getElementById("myInput").addEventListener("keyup", myFunction);

    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.querySelector(".table");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            var matchFound = false; // Flag to indicate if any field matches the filter
            if (tr[i].parentNode.nodeName === 'TBODY') { // Check if row belongs to tbody
                td = tr[i].getElementsByTagName("td");
                for (var j = 0; j < td.length; j++) {
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        matchFound = true;
                        break; // Break loop if match found in any field
                    }
                }
                if (matchFound) {
                    tr[i].style.display = ""; // Show the row if match found in any field
                } else {
                    tr[i].style.display = "none"; // Hide the row if no match found in any field
                }
            }
        }
    }
      
    
    function fetchAndUpdateTable() {
        totalCount = 0;
        fetch('http://localhost:2020/api/studentList')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming 'data' is an array of student objects
                const studentList = document.getElementById('student-list');
                studentList.innerHTML = ''; // Clear the existing table data

                data.forEach(student => {
                    // Create a new table row for each student
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.studentName}</td>
                        <td>${student.mobileNumber}</td>
                        <td>${student.email}</td>
                    `;
                    studentList.appendChild(row);
                    totalCount++;
                });
                document.getElementById('tsBox').innerText = totalCount;

            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors here, e.g., display an error message to the user
            });

    }

    // Add an event listener to the table itself
    document.getElementById('student-list').addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.tagName === 'TD') {
            // Get the clicked row
            const clickedRow = target.parentElement;

            // Extract data from the clicked row
            const id = clickedRow.cells[0].textContent;
            const studentName = clickedRow.cells[1].textContent;
            const mobileNumber = clickedRow.cells[2].textContent;
            const email = clickedRow.cells[3].textContent;

            // Populate the form fields with the extracted data
            document.getElementById('id').value = id;
            document.getElementById('name').value = studentName;
            document.getElementById('mobile').value = mobileNumber;
            document.getElementById('email').value = email;
        }
    });

    document.getElementById('submit').addEventListener('click', function () {
        // Gather form data
        var studentName = document.getElementById('name').value;
        var mobileNumber = document.getElementById('mobile').value;
        var email = document.getElementById('email').value;

        // Check if any of the fields are empty
        if (!studentName || !mobileNumber || !email) {
            alert('Please fill in all fields before submitting.');
            return; // Stop execution if any field is empty
        }

        // Check if mobile number is exactly 10 digits long
        if (mobileNumber.length !== 10) {
            alert('Mobile number must be exactly 10 digits long.');
            return; // Stop execution if mobile number length is not 10
        }
        // Create a student object
        var student = {
            studentName: studentName,
            mobileNumber: mobileNumber,
            email: email
        };

        // Send the data to your Spring Boot API
        fetch('http://localhost:2020/api/addStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                alert('Network response was not ok');
            }
            fetchAndUpdateTable();
            document.getElementById('studentForm').reset();
            return response.json();
            // alert("test1" + response.json());
        }).then(data => {
            // Handle the response from the API as needed
            console.log('Student data posted:', data);
            // You can also reset the form if needed: document.getElementById('studentForm').reset();
            // alert("test2" + data);
        }).catch(error => {
            console.error('Error:', error);
            // Handle errors here, e.g., display an error message to the user
            // alert("test3" + error);
        });
        //document.getElementById('studentForm').reset();
        //fetchAndUpdateTable();
    });

    document.getElementById('update').addEventListener('click', function () {
        // Gather form data
        var id = document.getElementById('id').value;
        var studentName = document.getElementById('name').value;
        var mobileNumber = document.getElementById('mobile').value;
        var email = document.getElementById('email').value;

        // Check if any of the fields are empty
        if (!studentName || !mobileNumber || !email) {
            alert('Please fill in all fields before submitting.');
            return; // Stop execution if any field is empty
        }

        // Check if mobile number is exactly 10 digits long
        if (mobileNumber.length !== 10) {
            alert('Mobile number must be exactly 10 digits long.');
            return; // Stop execution if mobile number length is not 10
        }
        // Create a student object
        var student = {
            studentName: studentName,
            mobileNumber: mobileNumber,
            email: email
        };

        // Send the data to your Spring Boot API
        fetch('http://localhost:2020/api/updateStudent/' + id + '', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        }).then(response => {
            if (response.status === 200) {
                // Student deleted successfully
                showNotification('Student details have been successfully Updated.');
                fetchAndUpdateTable();
            } else {
                // Handle other status codes or errors
                console.error('Error:', response.statusText);
            }
            return response.json();

        }).then(data => {
            // Handle the response from the API as needed
            console.log('Student data posted:', data);
            // You can also reset the form if needed: document.getElementById('studentForm').reset();
            
        }).catch(error => {
            console.error('Error:', error);
            // Handle errors here, e.g., display an error message to the user
           
        });
        //document.getElementById('studentForm').reset();
        //fetchAndUpdateTable();
    });
    fetchAndUpdateTable();

    // End of your code
    document.getElementById('delete').addEventListener('click', function () {
        // Gather form data
        var id = document.getElementById('id').value;

        const confirmation = confirm("Are you sure you want to delete this student?");
        if (!confirmation) {
            return; // If the user cancels the deletion, do nothing
        }

        // Send the data to your Spring Boot API
        fetch(`http://localhost:2020/api/deleteStudent/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 200) {
                    // Student deleted successfully
                    showNotification('Student details have been successfully deleted.');
                    fetchAndUpdateTable();
                } else {
                    // Handle other status codes or errors
                    console.error('Error:', response.statusText);
                }

                return response.json();
            })
            .then(data => {
                // Handle the response from the API as needed
                console.log('Student deleted:', data);

                // Refresh the table or update the UI to reflect the deletion
                
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors here, e.g., display an error message to the user
            });
    });

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.innerText = message;
        notification.style.display = 'block';

        setTimeout(function () {
            notification.style.display = 'none';
        }, 3000); // Hide the notification after 3 seconds (adjust as needed)
    }

});
