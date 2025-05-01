const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const fileInput = document.querySelector('#fileInput');
const saveBtn = document.querySelector('#saveBtn');
const searchInput = document.querySelector('#searchInput');
const tbody = document.querySelector('tbody');
const counter = document.querySelector('#counter');

let students = [];
let editIndex = -1;

function display(stu = students) {
    tbody.innerHTML = '';
    if (stu.length === 0) {
        tbody.innerHTML = `
            <tr>
                    <td colspan="6" class="text-center">
                        <h5 class="text-secondary">No students data.</h5>
                    </td>
            </tr>
        `;
    }
    stu.forEach((student, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.gen}</td>
                    <td>${student.email}</td>
                    <td><img style="width: 2.5rem; height: 2.5rem;" class="object-fit-cover rounded-circle"
                            src="${student.imgUrl}">
                        </td>
                    <td>
                        <span class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#view" onclick="viewStudent(${index})" >View</span>
                        <span class="btn btn-warning" onclick="editStudent(${index})" >Edit</span>
                        <span class="btn btn-danger" onclick="deleteStudent(${index})" >Delete</span>
                    </td>
                </tr>
            `;
        tbody.appendChild(tr);
    })
}
function updateCounter(stu = students) {
    counter.innerHTML = `
    <svg
xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor"
class="bi bi-people me-1" viewBox="0 0 16 16">
<path
d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312
10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11
7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0
0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92
10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2
2 0 1 0 0 4 2 2 0 0 0 0-4" />
    </svg> ${stu.length}
    `;
}
function saveStudent(){
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let gender = document.querySelector('input[name="gender"]:checked')?.value;
    let file = fileInput.files[0];
    let id = students.length ;
    let student={
        id : id + 1,
        name : name,
        email : email,
        gen : gender
    }
    if(!name || !email || !gender){
        alert("Please Fill Out All Fields");
        return;
    }
    if(file){
        let reader = new FileReader();
        reader.onload = function(e){
            student.imgUrl = e.target.result;
            finalizeSave(student,id);
        }
        reader.readAsDataURL(file);
    }
}
function finalizeSave(student,oldId){
    if(editIndex===-1){
        students.push(student);
    }else{
        student.id = oldId;
        students[editIndex] = student;
        editIndex=-1;
        saveBtn.textContent = 'Update';
    }
    document.querySelector('form').reset();
    document.querySelector('#exampleModal').querySelector('.btn-close').click();
    display(students);
    updateCounter(students);

}
saveBtn.addEventListener('click',saveStudent);
function editStudent(index){
    editIndex=index;
    console.log(editIndex);
}
document.addEventListener('DOMContentLoaded',function(){
    display(students);
    updateCounter(students);
})
function viewStudent(index){
    let stu = students[index];
    document.querySelector('#tb').innerHTML = `
        <tr>
            <td class="text-start"><h6>Name </h6></td>
            <td><h6>: ${stu.name}</h6></td>
        </tr>
        <tr>
            <td class="text-start"><h6>ID </h6></td>
            <td><h6>: ${stu.id}</h6></td>
        </tr>
        <tr>
            <td class="text-start"><h6>Gender </h6></td>
            <td><h6>: ${stu.gen}</h6></td>
        </tr>
        <tr>
            <td class="text-start"><h6>Email </h6></td>
            <td><h6>: ${stu.email}</h6></td>
        </tr>
    `;
    document.querySelector('#img').innerHTML = `
    <img style="width: 8rem; height: 8rem; padding: 1px;" class="object-fit-cover border border-dark-subtle card-img-top rounded-circle" src="${stu.imgUrl}" alt="">
    `;
}
function editStudent(index){
    editIndex = index;
    let stu = students[editIndex];
    nameInput.value = stu.name;
    emailInput.value = stu.email;

    if(stu.gen === "Male"){
        document.querySelector('#male').checked = true;
    }else if(stu.gen === "Female"){
        document.querySelector('#female').checked = true;
    }else{
        document.querySelector('#other').checked = true;
    }
    document.querySelector('#addBtn').click();
    saveBtn.textContent='Update';

}
function deleteStudent(index){
    if(confirm("Are u sure to delete?")){
        students.splice(index,1);
        display(students);
        updateCounter(students);
    }
}
searchInput.addEventListener('input',function(){
    let char = searchInput.value.toLowerCase().trim();
    if(char === ''){
        display(students);
        return;
    }
    let arrStu = students.filter(stu =>
        stu.name.toLowerCase().includes(char));
    display(arrStu);

})