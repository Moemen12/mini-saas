export const formatCurrency = (value: string | null) => {
    const amount = Number.parseFloat(value ?? "0");
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "No deadline";
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};