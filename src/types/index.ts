export type Guitarra = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    
    // availability: true;

}

// export type CartItem = Guitarra & {
//     quantity: number

// }

//esto es lo mismo selecciona los atributos estos de carItem
export type CarItem = Pick<Guitarra, 'id' | 'name' | 'price' | 'image' > & {
    quantity: number
}

//Omit permite quitar ciertos atributos 
// export type CarItem = Omit<Guitarra, 'id' | 'name' | 'price' > & {
//     quantity: number
// }

export type GuitarraID = Guitarra['id'];