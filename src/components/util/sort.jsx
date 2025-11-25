export function sortJsonArrayAlphabetically(array, fieldName) {
    array = [...array];
    array.sort((a, b) => {
        const nameA = a[fieldName].toLowerCase(); // Convert to lowercase for case-insensitive sorting
        const nameB = b[fieldName].toLowerCase();

        if (nameA < nameB) {
            return -1; // nameA comes before nameB
        }
        if (nameA > nameB) {
            return 1; // nameA comes after nameB
        }
        return 0; // names are equal
    });

    return array;
}