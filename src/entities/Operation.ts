export interface Operation {
    "idOperation": number,
    "name": string,
    "price": number,
    "type": string,
    "description": string,
    "length": string,
    "note": string,
    "targetAnimals": string
}

export const getOperationLabel = (op : Operation) => {
    return op.name
}

export const getOperationID = (op : Operation) => {
    return op.idOperation
}