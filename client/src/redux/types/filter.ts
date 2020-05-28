// export enum FiltersKey {
//     'DEATH'='DEATH',
//     'GENDER'='DEATH',
//     'AGE'='AGE',
//     'SEVERITY'='SEVERITY',
// }

export interface Filters {
    death: boolean | null,
    gender: 'male' | 'female' | null,
    age: [number, number] | null,
    severity: 0 | 1 | 2 | null
}
