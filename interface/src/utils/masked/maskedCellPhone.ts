export const maskedCellPhone = (landline: string) => {
    const numbers = landline.split("");
    const partOne = numbers.slice(0, 2);
    const partTwo = numbers.slice(2, 7);
    const partThree = numbers.slice(7, 12);

    return `(${partOne.join("")}) ${partTwo.join("")}-${partThree.join("")}`;
}