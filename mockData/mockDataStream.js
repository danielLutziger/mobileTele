export function generateMockData(key) {
    const currentTime = new Date();
    const data = [];

    for (let i = 0; i < 180; i++) {
        const timestamp = new Date(currentTime.getTime() - i * 1000).toISOString();
        const value = Math.sin(i * (Math.PI / 180)) * 50 + 50; // Generate sine values between 0 and 100
        const health = getRandomHealth();

        const mockData = {
            [key]: {
                timestamp,
                value,
                health,
            },
        };

        data.push(mockData);
    }

    return data;
}

export function generateMockDataForOneSecond(key, i) {
    const currentTime = new Date();
    const timestamp = new Date(currentTime.getTime() - 1000).toISOString();
    const value = Math.sin(i * (Math.PI / 180)) * 50 + 50; // Generate sine values between 0 and 100
    const health = getRandomHealth();

    const mockData = {
        [key]: {
            timestamp,
            value,
            health,
        },
    };

    return mockData;
}

function getRandomHealth() {
    const healthOptions = ["green", "yellow", "red"];
    const randomIndex = Math.floor(Math.random() * healthOptions.length);
    return healthOptions[randomIndex];
}
