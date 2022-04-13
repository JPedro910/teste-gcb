export const maskedCep = (landline: string) => {
    const numbers = landline.split("");
    const partOne = numbers.slice(0, 5);
    const partTwo = numbers.slice(5, 8);

    return `${partOne.join("")}-${partTwo.join("")}`;
}