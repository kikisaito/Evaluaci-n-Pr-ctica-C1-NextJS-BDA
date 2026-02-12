const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchCustomers(page: number = 1) {
    try {
        const res = await fetch(`${API_URL}/api/reports/customers?page=${page}`);
        if (!res.ok) throw new Error('Error al obtener clientes');
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchSales() {
    try {
        const res = await fetch(`${API_URL}/api/reports/sales`);
        if (!res.ok) throw new Error('Error al obtener ventas');
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchInventory() {
    try {
        const res = await fetch(`${API_URL}/api/reports/inventory`);
        if (!res.ok) throw new Error('Error al obtener inventario');
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchPayments() {
    try {
        const res = await fetch(`${API_URL}/api/reports/payments`);
        if (!res.ok) throw new Error('Error al obtener pagos');
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchRanking(search: string = '', page: number = 1) {
    try {
        const res = await fetch(`${API_URL}/api/reports/ranking?search=${encodeURIComponent(search)}&page=${page}`);
        if (!res.ok) throw new Error('Error al obtener ranking');
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}
