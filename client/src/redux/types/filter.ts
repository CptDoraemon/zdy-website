export interface Filters {
    death: boolean | null,
    gender: 'male' | 'female' | null,
    age: [number, number] | null,
    severity: 0 | 1 | 2 | null
}

export const filterChoices = {
    death: [
        [true, 'yes'],
        [false, 'no'],
    ],
    gender: [
        ['male', 'male'],
        ['female', 'female']
    ],
    age: [
        ['male', 'male'],
        ['female', 'female']
    ],
    severity: [
        [1, '1'],
        [2, '2'],
        [3, '3']
    ]
};
