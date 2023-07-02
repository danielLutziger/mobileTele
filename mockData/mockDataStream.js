export default function generateMockData() {
    const currentTime = new Date();
    const data = [];

    for (let i = 0; i < 180; i++) {
        const timestamp = new Date(currentTime.getTime() - i * 1000).toISOString();
        const value = Math.floor(Math.random() * 100);
        const health = getRandomHealth();

        const mockData = {
            state_prop_speed_clamping_up_back: {
                timestamp,
                value,
                health,
            },
        };

        data.push(mockData);
    }

    return data;
}

function getRandomHealth() {
    const healthOptions = ["green", "yellow", "red"];
    const randomIndex = Math.floor(Math.random() * healthOptions.length);
    return healthOptions[randomIndex];
}
