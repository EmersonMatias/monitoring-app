export async function getData() {
    const res = await fetch(`${process.env.BACKEND_URL}/vigilants`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
 
    return res.json() 
}