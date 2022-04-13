export const maskedLandline = (landline: string) => {
    const numbers = landline.split("");
    const partOne = numbers.slice(0, 2);
    const partTwo = numbers.slice(2, 6);
    const partThree = numbers.slice(6, 11);

    return `(${partOne.join("")}) ${partTwo.join("")}-${partThree.join("")}`;
}