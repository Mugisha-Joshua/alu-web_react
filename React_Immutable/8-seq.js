import { Seq } from 'immutable';

const capitalizeFirstLetter = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export default function printBestStudents(grades) {
  console.log(
    Seq(grades)
      .filter((student) => student.score >= 70)
      .map((student) => ({
        ...student,
        firstName: capitalizeFirstLetter(student.firstName),
        lastName: capitalizeFirstLetter(student.lastName),
      }))
      .toJS(),
  );
}
