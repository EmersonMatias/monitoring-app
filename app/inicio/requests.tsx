export async function getData() {
    const res = await fetch("http://localhost:4000/vigilants")

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
 
    return res.json() 
}