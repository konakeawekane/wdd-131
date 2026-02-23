
const aCourse = {
    code: 'CSE121b',
    name: 'Javascript Language',
    logo: 'images/turbo.png',
    sections: [
    { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'},
    { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}
    ],
    enrollStudent: function (sectionNum) {
        // find the right section...Array.findIndex will work here
        const sectionIndex = this.sections.findIndex(
          (section) => section.sectionNum == sectionNum
        );
        if (sectionIndex >= 0) {
          this.sections[sectionIndex].enrolled++;
          renderSections(this.sections);
        }
    },
    addSection: function (room, enrolled, days, instructor){
        let num = this.sections.length + 1;
        this.sections.push({
            sectionNum: num,
            roomNum: room,
            enrolled: enrolled,
            days: days,
            instructor: instructor
        })
    }
  };

function sectionTemplate(section) {
    return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td></tr>`
}

function renderSections(sections) {
const html = sections.map(sectionTemplate);
document.querySelector("#sections").innerHTML = html.join("");
}



document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
});

console.log(aCourse.name);

aCourse.code = "WDD131";

console.log(aCourse.code);

document.querySelector("#courseName").textContent = aCourse.name;
document.querySelector("#courseCode").textContent = aCourse.code;
document.querySelector("img").setAttribute('src', aCourse.logo);
document.querySelector("img").setAttribute('alt', aCourse.name);
document.querySelector("img").setAttribute('width', 100);

console.log(aCourse.sections[0].roomNum);

aCourse.addSection("STC 4000", 99, "MW", "Nacho Lebre");
aCourse.addSection("STC 0", 5, "TTh", "Brad Wilcox");
aCourse.addSection("STC 333", 10, "MTh", "Farris");

renderSections(aCourse.sections);