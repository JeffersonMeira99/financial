export const todayDate = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Define a hora para 00:00:00
    return today.toISOString().split('T')[0]; // Formata a data para 'YYYY-MM-DD'
})();
