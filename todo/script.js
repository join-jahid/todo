// select elements & assign them to variables
let newTask = document.querySelector('#new-task'); // নতুন টাস্ক ইনপুট ফিল্ড
let form = document.querySelector('form'); // ফর্ম এলিমেন্ট
let todoUl = document.querySelector('#items'); // অসম্পূর্ণ কাজের তালিকা
let completeUl = document.querySelector('.complete-list ul'); // সম্পূর্ণ কাজের তালিকা


// নতুন টাস্ক তৈরি করার ফাংশন
let createTask = function(task) {
    let listItem = document.createElement('li'); // নতুন <li> তৈরি
    let checkBox = document.createElement('input'); // চেকবক্স তৈরি
    let label = document.createElement('label'); // টাস্ক টেক্সট দেখানোর জন্য লেবেল

    label.innerText = task; // লেবেলে টাস্কের নাম সেট করা
    checkBox.type = 'checkbox'; // চেকবক্স টাইপ ঠিক করা

    listItem.appendChild(checkBox); // চেকবক্স <li>-এর মধ্যে যোগ করা
    listItem.appendChild(label); // লেবেল <li>-এর মধ্যে যোগ করা

    return listItem; // নতুন টাস্ক লিস্ট আইটেম রিটার্ন করা
}

// নতুন টাস্ক লিস্টে যোগ করা
let addTask = function(event) {
    event.preventDefault(); // ফর্ম সাবমিট হলে পেজ রিফ্রেশ বন্ধ করা
    let listItem = createTask(newTask.value); // ইনপুট থেকে টাস্কের নাম নিয়ে একটি নতুন টাস্ক তৈরি করা
    todoUl.appendChild(listItem); // অসম্পূর্ণ টাস্ক লিস্টে নতুন টাস্ক যোগ করা
    newTask.value = ""; // ইনপুট ফিল্ড খালি করা
    // bind the new list item to the incomplete list
    bindInCompleteItems(listItem, completeTask); // নতুন টাস্কের চেকবক্সের জন্য ইভেন্ট লিসেনার সেট করা
}

//টাস্ক সম্পূর্ণ হলে প্রক্রিয়া
let completeTask = function() {
    let listItem = this.parentNode; // চেকবক্সের প্যারেন্ট <li>
    let deleteBtn = document.createElement('button'); // ডিলিট বাটন তৈরি
    deleteBtn.innerText = 'Delete'; // বাটনের নাম দেওয়া
    deleteBtn.className = 'delete'; // CSS ক্লাস সেট করা
    listItem.appendChild(deleteBtn); // বাটন <li>-তে যোগ করা

    let checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.remove(); // চেকবক্স মুছে ফেলা
    completeUl.appendChild(listItem); // সম্পূর্ণ টাস্কের লিস্টে <li> যোগ করা
    bindCompleteItems(listItem, deleteTask); // ডিলিট বাটনের জন্য ইভেন্ট লিসেনার যুক্ত করা
}
// টাস্ক মুছে ফেলা
let deleteTask = function() {
    let listItem = this.parentNode; // ডিলিট বাটনের প্যারেন্ট <li>
    let ul = listItem.parentNode; // <ul> যেখানে <li> আছে
    ul.removeChild(listItem); // <li> মুছে ফেলা
}

// ইভেন্ট লিসেনার সেট করা
let bindInCompleteItems = function(taskItem, checkboxClick) {
    let checkBox = taskItem.querySelector('input[type="checkbox"]');
    checkBox.onchange = checkboxClick; // চেকবক্সে ইভেন্ট লিসেনার
}

let bindCompleteItems = function(taskItem, deleteButtonClick) {
    let deleteButton = taskItem.querySelector('.delete');
    deleteButton.onclick = deleteButtonClick; // ডিলিট বাটনে ইভেন্ট লিসেনার
}

// delete privous task

// delete incompletItems
for(let i=0; i< todoUl.children.length; i++ ) {
    bindInCompleteItems(todoUl.children[i], completeTask);
}   
// delete completItems
for(let i=0; i< completeUl.children.length; i++ ) {
    bindCompleteItems(completeUl.children[i], deleteTask);
}
//  ফর্ম সাবমিট হ্যান্ডলিং
form.addEventListener('submit', addTask); // নতুন টাস্ক যোগ করার ফাংশন
