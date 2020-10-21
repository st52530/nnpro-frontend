
export interface Department {
    id : number
    name : string,
    address : string,
    phone : string,
    details? : string
}


const testDepatmentsList : Department[] = [
    {id : 1, name : "VetAlmatel Brno", address : "Jeronymova 34, Brno-Zidenice, 61800", phone : "+123456789", details : "Hlavni pobocka"},
    {id : 2, name : "VetAlmatel Pardubice", address : "Jeronymova 34, Brno-Zidenice, 61800", phone : "+123456789", details : "Hlavni pobocka"},
    {id : 3, name : "VetAlmatel Praha", address : "Jeronymova 34, Brno-Zidenice, 61800", phone : "+123456789", details : "Hlavni pobocka"},
]


export async function getDepartments() : Promise<Department[]> {
    await new Promise( resolve  => setTimeout(resolve, 3000));
    return testDepatmentsList;
}

export async function getDepartment(id : number) : Promise<Department | undefined> {
    await new Promise( resolve  => setTimeout(resolve, 3000));
    return testDepatmentsList.find(d => d.id === id);
}