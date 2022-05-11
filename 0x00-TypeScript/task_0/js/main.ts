/** Renders table based on a list of objects */

interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const studentA: Student = {
  firstName: 'Sofia',
  lastName: 'Cheung',
  age: 19,
  location: 'California',
}

const studentB: Student = {
  firstName: 'Mafer',
  lastName: 'Morales',
  age: 19,
  location: 'Panama',
}

const studentList = [studentA, studentB];

const tableHtml: HTMLTableElement = document.createElement('table');
const theadHtml: HTMLTableSectionElement = document.createElement('thead');
const tbodyHtml: HTMLTableSectionElement = document.createElement('tbody')

const rowHeader: HTMLTableRowElement = theadHtml.insertRow();
rowHeader.insertCell(0).innerHTML = 'firstName';
rowHeader.insertCell(1).innerHTML = 'location';

tableHtml.append(theadHtml);

studentList.forEach(student => {
  const row: HTMLTableRowElement = tbodyHtml.insertRow();
  row.insertCell(0).innerHTML = student.firstName;
  row.insertCell(1).innerHTML = student.location;
});

tableHtml.append(tbodyHtml);
document.body.appendChild(tableHtml);
