

export const getMonths = (activity) => { 
    return activity.reduce((acum, { week }) => {
        const month = week.toLocaleString('en-EN', { month: 'short' });
        return (!acum.includes(month)) ? [...acum, month] : acum 
    }, [])   
}
